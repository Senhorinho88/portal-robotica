import test from "node:test";
import assert from "node:assert/strict";
import { courses } from "../src/data/courses.js";
import {
  buildMaterialChecklist,
  materialChecklistUrl,
} from "../src/lib/materials.js";

test("checklist contém o curso e todos os materiais em itens marcáveis", () => {
  for (const course of courses) {
    const text = buildMaterialChecklist(course);
    assert.ok(text.includes(course.title));
    assert.ok(text.includes(`Nível: ${course.level}`));
    for (const material of course.materials)
      assert.ok(text.includes(`[ ] ${material}`));
  }
});

test("download preserva caracteres acentuados e não depende de um servidor", () => {
  const url = materialChecklistUrl(courses[0]);
  assert.ok(url.startsWith("data:text/plain;charset=utf-8,"));
  assert.equal(
    decodeURIComponent(url.split(",")[1]),
    buildMaterialChecklist(courses[0]),
  );
});
