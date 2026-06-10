type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="progressWrap" aria-label={label}>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      {label ? <span>{label}</span> : null}
    </div>
  );
}
