export default function ProgressBar({
  value,
  label = "Progresso do curso",
  showValue = true,
}) {
  const percent = Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : 0;
  return (
    <div className="progress-component">
      {showValue && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{percent}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
