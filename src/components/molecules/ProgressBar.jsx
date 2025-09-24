import React from "react";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  label, 
  showPercentage = true,
  variant = "primary",
  size = "md",
  className 
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600",
    success: "bg-gradient-to-r from-success-500 to-success-600",
    warning: "bg-gradient-to-r from-warning-500 to-warning-600",
    error: "bg-gradient-to-r from-error-500 to-error-600"
  };

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "transition-all duration-500 ease-out rounded-full",
            variants[variant],
            sizes[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;