import { useLearning } from "../context/LearningContext.jsx";
import { progressPercent } from "../lib/progress.js";
import { materialChecklistUrl } from "../lib/materials.js";
import Icon from "./Icon.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Tabs from "./Tabs.jsx";

export default function CourseDetails({ course, initialTab = "sobre" }) {
  const { progress, enroll, changeLesson } = useLearning();
  const enrollment = progress[course.id];
  const completed = enrollment?.completedLessons ?? [];
  const percent = progressPercent(completed.length, course.lessons.length);
  const items = [
    {
      id: "sobre",
      title: "Sobre o curso",
      content: (
        <div className="about-course">
          <p>{course.description}</p>
          <div className="outcome">
            <span className="small-icon">
              <Icon name="flag" size={18} />
            </span>
            <div>
              <h4>O que você vai construir</h4>
              <p>{course.outcome}</p>
            </div>
          </div>
          <p className="course-note">
            Ementa demonstrativa · Estude no seu ritmo, uma descoberta de cada
            vez.
          </p>
        </div>
      ),
    },
    {
      id: "aulas",
      title: "Aulas",
      content: (
        <>
          <p className="lesson-intro">
            {enrollment
              ? "Marque as etapas que você já estudou. Você pode desmarcá-las para revisar."
              : "Comece o curso para registrar as aulas que você concluir."}
          </p>
          <ol className="lesson-list">
            {course.lessons.map((lesson, i) => (
              <li key={lesson.id}>
                <span className="lesson-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <label>
                  <input
                    type="checkbox"
                    disabled={!enrollment}
                    checked={completed.includes(lesson.id)}
                    onChange={() => changeLesson(course.id, lesson.id)}
                  />
                  <span>{lesson.title}</span>
                </label>
                <span className="lesson-duration">{lesson.minutes} min</span>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: "materiais",
      title: "Materiais",
      content: (
        <div className="materials">
          <p>
            Prepare sua bancada com os itens abaixo. Consulte a compatibilidade
            e a alimentação dos componentes antes da montagem.
          </p>
          <ul>
            {course.materials.map((material) => (
              <li key={material}>
                <Icon name="check" size={17} />
                {material}
              </li>
            ))}
          </ul>
          <div className="material-actions">
            <a
              className="button checklist-download"
              href={materialChecklistUrl(course)}
              download={`${course.id}-materiais.txt`}
            >
              Baixar checklist (.txt)
              <Icon name="arrow" size={16} />
            </a>
            <a
              className="text-link"
              href="https://www.tinkercad.com/circuits"
              target="_blank"
              rel="noreferrer"
            >
              Conhecer o Tinkercad Circuits <Icon name="arrow" size={16} />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      className="detail-section panel"
      id="detalhes"
      aria-labelledby="detail-title"
    >
      <div className="detail-header">
        <div>
          <p className="eyebrow">POR DENTRO DO CURSO</p>
          <h2 id="detail-title" tabIndex={-1}>
            {course.title}
          </h2>
          <p className="detail-meta">
            {course.level}
            <span>·</span>
            {course.hours} horas<span>·</span>
            {course.lessons.length} aulas
          </p>
        </div>
        {!enrollment ? (
          <button className="button dark" onClick={() => enroll(course.id)}>
            Começar curso
            <Icon name="arrow" size={17} />
          </button>
        ) : (
          <span
            className={`enrollment-badge ${percent === 100 ? "completed" : ""}`}
          >
            <Icon name={percent === 100 ? "check" : "bolt"} size={16} />
            {percent === 100 ? "Curso concluído" : "No seu aprendizado"}
          </span>
        )}
      </div>
      <div className="detail-progress">
        <ProgressBar value={percent} label="Seu progresso" />
        <span>
          {completed.length} de {course.lessons.length} aulas concluídas
        </span>
      </div>
      <Tabs key={course.id} items={items} initialActiveId={initialTab} />
    </section>
  );
}
