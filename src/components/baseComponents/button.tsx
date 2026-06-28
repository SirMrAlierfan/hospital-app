import type { JSX, ReactNode, ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children?: ReactNode; 
  className?: string;   
}

const Button = ({ 
  children, 
  className = "", 
  ...props 
}: ButtonProps): JSX.Element => {
  
 
  const baseStyles = `
    px-6 py-3 rounded-xl font-semibold tracking-wide
    transition-all duration-300 ease-in-out 
    bg-teal-700 text-white 
    shadow-lg shadow-blue-200/50
    hover:bg-teal-800 hover:shadow-blue-300/50 hover:-translate-y-0.5
    active:scale-95
    dark:bg-slate-400 dark:text-blue-50 
    dark:shadow-none
    dark:hover:bg-slate-300 dark:hover:text-slate-500 
    
  `;

  return (
    <button 
      
      className={`${baseStyles} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
