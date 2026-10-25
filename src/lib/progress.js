export const STORAGE_KEY = "orbita-progress-v1";

export function sanitizeProgress(value, courses) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    courses
      .filter((course) => Object.hasOwn(value, course.id))
      .map((course) => {
        const completed = value[course.id]?.completedLessons;
        const validIds = new Set(course.lessons.map((lesson) => lesson.id));
        return [
          course.id,
          {
            completedLessons: Array.isArray(completed)
              ? [...new Set(completed.filter((id) => validIds.has(id)))]
              : [],
          },
        ];
      }),
  );
}

export function readProgress(storage, courses) {
  try {
    return sanitizeProgress(JSON.parse(storage.getItem(STORAGE_KEY)), courses);
  } catch {
    return {};
  }
}

export function progressPercent(completed, total) {
  if (!total) return 0;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

export function toggleLesson(progress, courseId, lessonId) {
  const current = progress[courseId]?.completedLessons ?? [];
  const completedLessons = current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [...current, lessonId];
  return { ...progress, [courseId]: { completedLessons } };
}

export function paginate(items, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalPages,
    currentPage,
  };
}
