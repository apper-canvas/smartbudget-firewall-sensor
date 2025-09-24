import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const BudgetForm = ({ budget, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    category: "",
    allocated: "",
    month: format(new Date(), "MMMM"),
    year: new Date().getFullYear()
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        allocated: budget.allocated.toString(),
        month: budget.month,
        year: budget.year
      });
    }
  }, [budget]);

  const format = (date, formatStr) => {
    if (formatStr === "MMMM") {
      return date.toLocaleDateString("en-US", { month: "long" });
    }
    return date.toLocaleDateString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.allocated) {
      toast.error("Please fill in all required fields");
      return;
    }

    const allocated = parseFloat(formData.allocated);
    if (isNaN(allocated) || allocated <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    const budgetData = {
      ...formData,
      allocated,
      spent: budget ? budget.spent : 0
    };

    if (budget) {
      budgetData.Id = budget.Id;
    }

    onSubmit(budgetData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value
    }));
  };

  const expenseCategories = categories.filter(cat => cat.type === "expense");

  return (
    <Card className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {budget ? "Edit Budget" : "Create Budget"}
        </h2>
        <p className="text-sm text-gray-600">
          {budget ? "Update budget details" : "Set spending limits for categories"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {expenseCategories.map(category => (
            <option key={category.Id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>

        <Input
          type="number"
          step="0.01"
          min="0"
          label="Budget Amount"
          name="allocated"
          value={formData.allocated}
          onChange={handleChange}
          placeholder="0.00"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          >
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>

          <Select
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {budget ? "Update Budget" : "Create Budget"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BudgetForm;