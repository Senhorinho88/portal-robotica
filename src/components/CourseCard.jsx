import Icon from "./Icon.jsx";
import RobotArt from "./RobotArt.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { progressPercent } from "../lib/progress.js";
import { useLearning } from "../context/LearningContext.jsx";

export default function CourseCard({ course, onSelect }) {
  const { progress } = useLearning();
  const enrollment = progress[course.id];
  return (
    <article className="course-card">
      <div className={`course-cover ${course.color}`}>
        <span className="level-badge">{course.level}</span>
        <RobotArt variant={course.art} />
        <span className="cover-index">Ó / LAB</span>
      </div>
      <div className="course-card-body">
        <p className="eyebrow">{course.category}</p>
        <h3>{course.title}</h3>
        <p className="course-meta">
          <span>
            <Icon name="clock" size={14} />
            {course.hours} horas
          </span>
          <span>
            <Icon name="book" size={14} />
            {course.lessons.length} aulas
          </span>
        </p>
        {enrollment && (
          <ProgressBar
            value={progressPercent(
              enrollment.completedLessons.length,
              course.lessons.length,
            )}
            label={`Progresso em ${course.title}`}
            showValue={false}
          />
        )}
        <button
          className="course-open"
          onClick={() => onSelect(course)}
          aria-label={`${enrollment ? "Continuar" : "Explorar"} curso: ${course.title}`}
        >
          <span>{enrollment ? "Continuar curso" : "Explorar curso"}</span>
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </article>
  );
}
