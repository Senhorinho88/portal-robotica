import { progressPercent } from "./progress.js";

export function getLearningResume(courses, progress) {
  const enrolled = courses.filter((course) =>
    Object.hasOwn(progress, course.id),
  );
  for (const course of enrolled) {
    const completed = progress[course.id].completedLessons;
    const lesson = course.lessons.find((item) => !completed.includes(item.id));
    if (lesson)
      return {
        course,
        lesson,
        percent: progressPercent(completed.length, course.lessons.length),
      };
  }
  return enrolled.length
    ? { course: enrolled[0], lesson: null, percent: 100 }
    : null;
}
