import test from "node:test";
import assert from "node:assert/strict";
import { courses } from "../src/data/courses.js";
import { selectCatalog } from "../src/lib/catalog.js";

test("busca combina acentos, espaços e filtro de nível", () => {
  assert.deepEqual(
    selectCatalog(courses, { query: "  LÓGICA  ", level: "Iniciante" }).map(
      (course) => course.id,
    ),
    ["programacao"],
  );
  assert.equal(
    selectCatalog(courses, { query: "sensóres", level: "Avançado" }).length,
    0,
  );
});

test("menor duração reorganiza a lista sem alterar a recomendação original", () => {
  const originalIds = courses.map((course) => course.id);
  const sorted = selectCatalog(courses, { sort: "duration" });
  assert.equal(sorted[0].id, "sensores");
  assert.equal(sorted.at(-1).id, "braco");
  assert.deepEqual(
    courses.map((course) => course.id),
    originalIds,
  );
  assert.deepEqual(
    selectCatalog(courses).map((course) => course.id),
    originalIds,
  );
});

test("ordenação alfabética também funciona nos cursos iniciados", () => {
  const result = selectCatalog(courses, {
    sort: "title",
    enrolledOnly: true,
    progress: { sensores: {}, arduino: {} },
  });
  assert.deepEqual(
    result.map((course) => course.id),
    ["arduino", "sensores"],
  );
});

test("filtros sem correspondência produzem uma lista vazia", () => {
  assert.deepEqual(selectCatalog(courses, { query: "inexistente" }), []);
  assert.deepEqual(selectCatalog(courses, { enrolledOnly: true }), []);
});
