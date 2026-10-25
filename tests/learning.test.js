import test from "node:test";
import assert from "node:assert/strict";
import { courses } from "../src/data/courses.js";
import {
  paginate,
  progressPercent,
  readProgress,
  sanitizeProgress,
  toggleLesson,
} from "../src/lib/progress.js";

test("concluir e reabrir uma aula preserva os outros cursos e o estado anterior", () => {
  const original = {
    sensores: { completedLessons: ["aula-2"] },
    arduino: { completedLessons: [] },
  };
  const updated = toggleLesson(original, "arduino", "aula-1");
  assert.deepEqual(updated.arduino.completedLessons, ["aula-1"]);
  assert.deepEqual(original.arduino.completedLessons, []);
  assert.deepEqual(updated.sensores, original.sensores);
  assert.deepEqual(
    toggleLesson(updated, "arduino", "aula-1").arduino.completedLessons,
    [],
  );
});

test("o progresso representa aulas concluídas e respeita os limites", () => {
  assert.equal(progressPercent(0, 6), 0);
  assert.equal(progressPercent(1, 6), 17);
  assert.equal(progressPercent(3, 6), 50);
  assert.equal(progressPercent(6, 6), 100);
  assert.equal(progressPercent(8, 6), 100);
  assert.equal(progressPercent(-1, 6), 0);
  assert.equal(progressPercent(0, 0), 0);
});

test("dados persistidos descartam cursos e aulas desconhecidos e IDs repetidos", () => {
  const result = sanitizeProgress(
    {
      arduino: { completedLessons: ["aula-1", "inexistente", "aula-1", null] },
      sensores: null,
      desconhecido: { completedLessons: ["aula-1"] },
    },
    courses,
  );
  assert.deepEqual(result, {
    arduino: { completedLessons: ["aula-1"] },
    sensores: { completedLessons: [] },
  });
  assert.deepEqual(sanitizeProgress([], courses), {});
  assert.deepEqual(sanitizeProgress(null, courses), {});
});

test("o portal inicia sem progresso quando o armazenamento está indisponível ou corrompido", () => {
  assert.deepEqual(
    readProgress(
      {
        getItem() {
          throw new Error("Bloqueado");
        },
      },
      courses,
    ),
    {},
  );
  assert.deepEqual(
    readProgress(
      {
        getItem() {
          return "{json inválido";
        },
      },
      courses,
    ),
    {},
  );
  assert.deepEqual(
    readProgress(
      {
        getItem() {
          return null;
        },
      },
      courses,
    ),
    {},
  );
});

test("a paginação mantém os itens corretos, inclusive ao reduzir a lista com um filtro", () => {
  assert.equal(paginate(courses, 1, 3).totalPages, 3);
  assert.deepEqual(
    paginate(courses, 2, 3).items.map((course) => course.id),
    ["programacao", "automacao", "braco"],
  );
  assert.equal(paginate(courses, 3, 3).items.length, 2);
  assert.equal(paginate(courses.slice(0, 2), 3, 3).currentPage, 1);
  assert.deepEqual(paginate([], 1, 3), {
    items: [],
    totalPages: 1,
    currentPage: 1,
  });
});
