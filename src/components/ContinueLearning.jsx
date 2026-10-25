import { getLearningResume } from "../lib/resume.js";
import Icon from "./Icon.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function ContinueLearning({ courses, progress, onContinue }) {
  const resume = getLearningResume(courses, progress);
  if (!resume) return null;
  const { course, lesson, percent } = resume;
  return (
    <section className="continue-learning panel" aria-labelledby="resume-title">
      <span className="stat-icon mint">
        <Icon name={lesson ? "play" : "check"} size={20} />
      </span>
      <div className="resume-copy">
        <p className="eyebrow">
          {lesson ? "SEU PRÓXIMO PASSO" : "JORNADA CONCLUÍDA"}
        </p>
        <h2 id="resume-title">
          {lesson
            ? lesson.title
            : "Tudo em dia. Que tal revisar suas descobertas?"}
        </h2>
        <p>
          {course.title}
          {lesson ? ` · ${lesson.minutes} min` : ""}
        </p>
        <ProgressBar
          value={percent}
          label={`Progresso de retomada: ${course.title}`}
          showValue={false}
        />
      </div>
      <button
        className="button dark"
        onClick={() => onContinue(course, "aulas")}
      >
        {lesson ? "Retomar aula" : "Revisar aulas"}
        <Icon name="arrow" size={16} />
      </button>
    </section>
  );
}
