export function buildMaterialChecklist(course) {
  return [
    "ÓRBITA — CHECKLIST DE MATERIAIS",
    "",
    `Curso: ${course.title}`,
    `Nível: ${course.level}`,
    "",
    "Separe os itens antes de começar:",
    ...course.materials.map((material) => `[ ] ${material}`),
    "",
    "Antes da montagem:",
    "[ ] Conferir a alimentação e os limites dos componentes.",
    "[ ] Desconectar a fonte antes de alterar as ligações.",
    "[ ] Organizar a bancada e revisar o circuito.",
    "",
    "Lista de referência de um curso demonstrativo. Adapte ao projeto escolhido.",
    "",
  ].join("\n");
}

export function materialChecklistUrl(course) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(buildMaterialChecklist(course))}`;
}
