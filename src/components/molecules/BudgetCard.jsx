import React from "react";
import Card from "@/components/atoms/Card";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const percentage = budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;
  const remaining = budget.allocated - budget.spent;
  const isOverBudget = budget.spent > budget.allocated;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  const getProgressVariant = () => {
    if (isOverBudget) return "error";
    if (percentage > 80) return "warning";
    return "primary";
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{budget.category}</h3>
          <p className="text-sm text-gray-600">{budget.month} {budget.year}</p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon="Edit2"
            onClick={() => onEdit(budget)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete(budget.Id)}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Spent</span>
          <span className={`font-medium ${isOverBudget ? "text-error-600" : "text-gray-900"}`}>
            {formatCurrency(budget.spent)}
          </span>
        </div>
        
        <ProgressBar
          value={budget.spent}
          max={budget.allocated}
          variant={getProgressVariant()}
          showPercentage={false}
        />

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Budget</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(budget.allocated)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            {isOverBudget ? "Over budget" : "Remaining"}
          </span>
          <div className="flex items-center gap-1">
            <ApperIcon 
              name={isOverBudget ? "AlertTriangle" : "CheckCircle"} 
              size={16} 
              className={isOverBudget ? "text-error-500" : "text-success-500"} 
            />
            <span className={`font-medium text-sm ${
              isOverBudget ? "text-error-600" : "text-success-600"
            }`}>
              {formatCurrency(Math.abs(remaining))}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetCard;