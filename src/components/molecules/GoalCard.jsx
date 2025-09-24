import React from "react";
import Card from "@/components/atoms/Card";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const GoalCard = ({ goal, onEdit, onDelete, onContribute }) => {
  const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const remaining = goal.targetAmount - goal.currentAmount;
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  const getProgressVariant = () => {
    if (isCompleted) return "success";
    if (percentage > 75) return "primary";
    return "warning";
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{goal.name}</h3>
          <p className="text-sm text-gray-600">
            Target: {format(new Date(goal.targetDate), "MMM dd, yyyy")}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon="Plus"
            onClick={() => onContribute(goal)}
            className="text-success-600 hover:text-success-700 hover:bg-success-50"
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Edit2"
            onClick={() => onEdit(goal)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete(goal.Id)}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Current</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(goal.currentAmount)}
          </span>
        </div>
        
        <ProgressBar
          value={goal.currentAmount}
          max={goal.targetAmount}
          variant={getProgressVariant()}
          showPercentage={true}
        />

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Target</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(goal.targetAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            {isCompleted ? "Goal completed!" : "Remaining"}
          </span>
          <div className="flex items-center gap-1">
            <ApperIcon 
              name={isCompleted ? "Trophy" : "Target"} 
              size={16} 
              className={isCompleted ? "text-success-500" : "text-primary-500"} 
            />
            <span className={`font-medium text-sm ${
              isCompleted ? "text-success-600" : "text-primary-600"
            }`}>
              {isCompleted ? "Achieved!" : formatCurrency(remaining)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GoalCard;