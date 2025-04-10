// src/components/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "outline" | "ghost" | "filled"; // Add the variant types you want
  }
  
  export function Button({ variant = "filled", className, ...props }: ButtonProps) {
    const variantClasses = {
      outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-100",
      ghost: "text-blue-500 hover:bg-blue-100",
      filled: "bg-blue-500 text-white hover:bg-blue-600",
    };
  
    return (
      <button
        className={`${variantClasses[variant]} px-4 py-2 rounded-md transition ${className}`}
        {...props}
      />
    );
  }
  