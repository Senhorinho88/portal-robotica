export function normalizeSearch(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function selectCatalog(
  courses,
  {
    query = "",
    level = "all",
    enrolledOnly = false,
    progress = {},
    sort = "recommended",
  } = {},
) {
  const normalized = normalizeSearch(query);
  const result = courses.filter((course) => {
    const text = normalizeSearch(
      `${course.title} ${course.category} ${course.level}`,
    );
    return (
      (level === "all" || course.level === level) &&
      text.includes(normalized) &&
      (!enrolledOnly || Object.hasOwn(progress, course.id))
    );
  });
  if (sort === "duration")
    result.sort(
      (a, b) => a.hours - b.hours || a.title.localeCompare(b.title, "pt-BR"),
    );
  if (sort === "title")
    result.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  return result;
}
