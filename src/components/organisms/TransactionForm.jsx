import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";
import { toast } from "react-toastify";

const TransactionForm = ({ transaction, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd")
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description,
        date: format(new Date(transaction.date), "yyyy-MM-dd")
      });
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const transactionData = {
      ...formData,
      amount,
      date: new Date(formData.date).toISOString(),
      createdAt: transaction ? transaction.createdAt : new Date().toISOString()
    };

    if (transaction) {
      transactionData.Id = transaction.Id;
    }

    onSubmit(transactionData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <Card className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <p className="text-sm text-gray-600">
          {transaction ? "Update transaction details" : "Enter your income or expense details"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>

        <Input
          type="number"
          step="0.01"
          min="0"
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          required
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {filteredCategories.map(category => (
            <option key={category.Id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>

        <Input
          type="text"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />

        <Input
          type="date"
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {transaction ? "Update Transaction" : "Add Transaction"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TransactionForm;