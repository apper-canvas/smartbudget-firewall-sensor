import React from "react";
import { cn } from "@/utils/cn";

const badgeVariants = {
  success: "bg-success-100 text-success-700 border border-success-200",
  error: "bg-error-100 text-error-700 border border-error-200",
  warning: "bg-warning-100 text-warning-700 border border-warning-200",
  info: "bg-primary-100 text-primary-700 border border-primary-200",
  default: "bg-gray-100 text-gray-700 border border-gray-200"
};

const Badge = ({ variant = "default", children, className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;