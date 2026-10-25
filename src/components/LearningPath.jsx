import Icon from "./Icon.jsx";

export default function LearningPath({ steps, courses, progress, onSelect }) {
  return (
    <section className="learning-path" id="trilha" aria-labelledby="path-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">UM PASSO DE CADA VEZ</p>
          <h2 id="path-title">Uma trilha para começar a construir</h2>
        </div>
        <span className="section-aside">
          Três etapas. Muitas possibilidades.
        </span>
      </div>
      <p className="path-intro">
        Uma sequência sugerida para conectar lógica, eletrônica e movimento.
        Você também pode explorar os cursos livremente.
      </p>
      <ol className="path-grid">
        {steps.map((step, index) => {
          const course = courses.find((item) => item.id === step.courseId);
          if (!course) return null;
          const enrollment = progress[course.id];
          const complete =
            enrollment?.completedLessons.length === course.lessons.length;
          return (
            <li className="path-step" key={step.id}>
              <div className="path-step-top">
                <span className={`stat-icon ${step.color}`}>
                  <Icon name={complete ? "check" : step.icon} size={19} />
                </span>
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")} / {step.label}
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <button
                onClick={() => onSelect(course)}
                aria-label={`Ver etapa ${index + 1}: ${course.title}`}
              >
                <span>
                  {complete
                    ? "Revisar etapa"
                    : enrollment
                      ? "Continuar etapa"
                      : "Conhecer etapa"}
                </span>
                <Icon name="arrow" size={16} />
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
