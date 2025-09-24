import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const buttonVariants = {
  primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg",
  secondary: "bg-white border-2 border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-600 hover:bg-primary-50",
  success: "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-md hover:shadow-lg",
  error: "bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-md hover:shadow-lg",
  ghost: "hover:bg-gray-100 text-gray-700"
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};

const Button = forwardRef(({ 
  variant = "primary", 
  size = "md", 
  icon,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={size === "sm" ? 16 : 20} />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;