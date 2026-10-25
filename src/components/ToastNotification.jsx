import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { useLearning } from "../context/LearningContext.jsx";

export function ToastNotification({ id, message, type = "success", onClose }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timeout = window.setTimeout(() => onClose(id), 5000);
    return () => window.clearTimeout(timeout);
  }, [id, onClose, paused]);

  return (
    <div
      className={`toast toast-${type}`}
      role="status"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="toast-icon">
        <Icon name={type === "success" ? "check" : "help"} size={18} />
      </span>
      <p>{message}</p>
      <button
        aria-label={`Fechar notificação: ${message}`}
        onClick={() => onClose(id)}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

export default function ToastRegion() {
  const { toasts, dismissToast } = useLearning();
  return (
    <section className="toast-region" aria-label="Notificações">
      {toasts.map((toast) => (
        <ToastNotification {...toast} onClose={dismissToast} key={toast.id} />
      ))}
    </section>
  );
}
