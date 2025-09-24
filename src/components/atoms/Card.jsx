import React from "react";
import { cn } from "@/utils/cn";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl card-shadow p-6 hover-lift transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;