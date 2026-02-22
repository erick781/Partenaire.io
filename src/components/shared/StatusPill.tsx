interface StatusPillProps {
  status: "success" | "warning" | "danger" | "info" | "neutral";
  label: string;
}

const statusStyles = {
  success: "text-cfo-green bg-cfo-green/[0.18]",
  warning: "text-cfo-yellow bg-cfo-yellow/[0.18]",
  danger: "text-cfo-red bg-cfo-red/[0.18]",
  info: "text-cfo-blue bg-cfo-blue/[0.18]",
  neutral: "text-cfo-muted bg-cfo-muted/[0.18]",
};

export default function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
