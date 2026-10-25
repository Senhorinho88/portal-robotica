import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { courses } from "../data/courses.js";
import { readProgress, STORAGE_KEY, toggleLesson } from "../lib/progress.js";

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      return readProgress(window.localStorage, courses);
    } catch {
      return {};
    }
  });
  const [toasts, setToasts] = useState([]);
  const nextToastId = useRef(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* O progresso continua disponível durante a sessão se o armazenamento estiver bloqueado. */
    }
  }, [progress]);

  const notify = useCallback((message, type = "success") => {
    const id = ++nextToastId.current;
    setToasts((current) => [...current.slice(-2), { id, message, type }]);
  }, []);

  const dismissToast = useCallback(
    (id) => setToasts((current) => current.filter((toast) => toast.id !== id)),
    [],
  );

  function enroll(courseId) {
    setProgress((current) =>
      current[courseId]
        ? current
        : { ...current, [courseId]: { completedLessons: [] } },
    );
    notify("Curso adicionado ao seu aprendizado. Vamos começar?");
  }

  function changeLesson(courseId, lessonId) {
    const wasCompleted =
      progress[courseId]?.completedLessons.includes(lessonId);
    setProgress((current) => toggleLesson(current, courseId, lessonId));
    notify(
      wasCompleted
        ? "Aula reaberta para você revisar."
        : "Aula concluída. Mais um passo na sua jornada!",
      wasCompleted ? "info" : "success",
    );
  }

  return (
    <LearningContext.Provider
      value={{ progress, toasts, notify, dismissToast, enroll, changeLesson }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const value = useContext(LearningContext);
  if (!value)
    throw new Error("useLearning precisa estar dentro de LearningProvider.");
  return value;
}
