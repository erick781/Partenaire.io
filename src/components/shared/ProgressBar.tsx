interface ProgressBarProps {
  value: number;
  max: number;
  color?: "green" | "red" | "yellow" | "blue" | "purple";
  className?: string;
}

const colorMap = {
  green: "bg-cfo-green",
  red: "bg-cfo-red",
  yellow: "bg-cfo-yellow",
  blue: "bg-cfo-blue",
  purple: "bg-cfo-purple",
};

export default function ProgressBar({
  value,
  max,
  color = "green",
  className = "",
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      className={`w-full h-1.5 bg-cfo-border rounded-full overflow-hidden ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorMap[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
