import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const ContributeForm = ({ goal, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount) {
      toast.error("Please enter contribution amount");
      return;
    }

    const contribution = parseFloat(amount);
    if (isNaN(contribution) || contribution <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    onSubmit(contribution);
    setAmount("");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <Card className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Contribute to {goal.name}
        </h2>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>Current: {formatCurrency(goal.currentAmount)}</p>
          <p>Target: {formatCurrency(goal.targetAmount)}</p>
          <p>Remaining: {formatCurrency(remaining)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          step="0.01"
          min="0"
          max={remaining}
          label="Contribution Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            After this contribution: {formatCurrency(goal.currentAmount + (parseFloat(amount) || 0))}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="success" className="flex-1">
            Add Contribution
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContributeForm;