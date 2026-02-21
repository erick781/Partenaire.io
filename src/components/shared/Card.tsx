interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "purple" | "red";
  className?: string;
}

export default function Card({ children, variant = "default", className = "" }: CardProps) {
  const baseClasses = "rounded-cfo p-4";

  const variantClasses = {
    default: "bg-cfo-card border border-cfo-border",
    green: "cfo-gradient-green rounded-cfo",
    purple: "cfo-gradient-purple rounded-cfo",
    red: "cfo-gradient-red rounded-cfo",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
