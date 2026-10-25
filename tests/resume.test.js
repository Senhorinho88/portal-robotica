import test from "node:test";
import assert from "node:assert/strict";
import { courses } from "../src/data/courses.js";
import { getLearningResume } from "../src/lib/resume.js";

test("não sugere retomada antes de iniciar um curso", () => {
  assert.equal(getLearningResume(courses, {}), null);
});

test("retoma a primeira aula pendente, inclusive após reabrir uma etapa anterior", () => {
  const progress = { arduino: { completedLessons: ["aula-1", "aula-3"] } };
  const resume = getLearningResume(courses, progress);
  assert.equal(resume.lesson.id, "aula-2");
  assert.equal(resume.percent, 33);
});

test("prioriza um curso com aulas pendentes em vez de outro já concluído", () => {
  const resume = getLearningResume(courses, {
    arduino: {
      completedLessons: courses[0].lessons.map((lesson) => lesson.id),
    },
    sensores: { completedLessons: [] },
  });
  assert.equal(resume.course.id, "sensores");
  assert.equal(resume.lesson.id, "aula-1");
});

test("oferece revisão quando todas as aulas dos cursos iniciados estão concluídas", () => {
  const resume = getLearningResume(courses, {
    arduino: {
      completedLessons: courses[0].lessons.map((lesson) => lesson.id),
    },
  });
  assert.equal(resume.percent, 100);
  assert.equal(resume.lesson, null);
});
