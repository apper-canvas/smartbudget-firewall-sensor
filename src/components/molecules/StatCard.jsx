import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  className,
  onClick 
}) => {
  const formatValue = (val) => {
    if (typeof val === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(val);
    }
    return val;
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success-600";
      case "negative":
        return "text-error-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 gradient-text">
            {formatValue(value)}
          </p>
          {change && (
            <p className={cn("text-sm flex items-center gap-1 mt-1", getChangeColor())}>
              <ApperIcon 
                name={changeType === "positive" ? "TrendingUp" : changeType === "negative" ? "TrendingDown" : "Minus"} 
                size={14} 
              />
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
            <ApperIcon name={icon} size={24} className="text-white" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;