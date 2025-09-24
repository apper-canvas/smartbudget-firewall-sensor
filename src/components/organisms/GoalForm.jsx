import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";
import { toast } from "react-toastify";

const GoalForm = ({ goal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    targetDate: format(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        targetDate: format(new Date(goal.targetDate), "yyyy-MM-dd")
      });
    }
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.targetDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const targetAmount = parseFloat(formData.targetAmount);
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }

    const targetDate = new Date(formData.targetDate);
    if (targetDate <= new Date()) {
      toast.error("Target date must be in the future");
      return;
    }

    const goalData = {
      ...formData,
      targetAmount,
      targetDate: targetDate.toISOString(),
      currentAmount: goal ? goal.currentAmount : 0,
      createdAt: goal ? goal.createdAt : new Date().toISOString()
    };

    if (goal) {
      goalData.Id = goal.Id;
    }

    onSubmit(goalData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {goal ? "Edit Goal" : "Create Savings Goal"}
        </h2>
        <p className="text-sm text-gray-600">
          {goal ? "Update goal details" : "Set a target for your savings"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Goal Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Emergency Fund, Vacation, etc."
          required
        />

        <Input
          type="number"
          step="0.01"
          min="0"
          label="Target Amount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          placeholder="0.00"
          required
        />

        <Input
          type="date"
          label="Target Date"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          min={format(new Date(Date.now() + 24 * 60 * 60 * 1000), "yyyy-MM-dd")}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {goal ? "Update Goal" : "Create Goal"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GoalForm;