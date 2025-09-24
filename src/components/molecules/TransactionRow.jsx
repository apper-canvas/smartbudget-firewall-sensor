import React from "react";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TransactionRow = ({ transaction, onEdit, onDelete }) => {
  const formatAmount = (amount, type) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(Math.abs(amount));
    
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const getAmountColor = (type) => {
    return type === "income" ? "text-success-600" : "text-error-600";
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            transaction.type === "income" 
              ? "bg-success-100 text-success-600" 
              : "bg-error-100 text-error-600"
          }`}>
            <ApperIcon 
              name={transaction.type === "income" ? "TrendingUp" : "TrendingDown"} 
              size={16} 
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{transaction.description}</p>
            <p className="text-sm text-gray-600">{transaction.category}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={transaction.type === "income" ? "success" : "error"}>
          {transaction.type}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <span className={`font-semibold ${getAmountColor(transaction.type)}`}>
          {formatAmount(transaction.amount, transaction.type)}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600">
        {format(new Date(transaction.date), "MMM dd, yyyy")}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon="Edit2"
            onClick={() => onEdit(transaction)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete(transaction.Id)}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          />
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;