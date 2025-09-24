import budgetsData from "@/services/mockData/budgets.json";
import { transactionService } from "@/services/api/transactionService";

let budgets = [...budgetsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const budgetService = {
  async getAll() {
    await delay();
    const allTransactions = await transactionService.getAll();
    
    return budgets.map(budget => {
      const spent = allTransactions
        .filter(t => 
          t.type === "expense" && 
          t.category === budget.category &&
          new Date(t.date).getMonth() === this.getMonthIndex(budget.month) &&
          new Date(t.date).getFullYear() === budget.year
        )
        .reduce((sum, t) => sum + t.amount, 0);
      
      return { ...budget, spent };
    });
  },

  async getById(id) {
    await delay();
    return budgets.find(budget => budget.Id === parseInt(id));
  },

  async create(budgetData) {
    await delay();
    const maxId = Math.max(...budgets.map(b => b.Id), 0);
    const newBudget = {
      ...budgetData,
      Id: maxId + 1,
      spent: 0
    };
    budgets.push(newBudget);
    return newBudget;
  },

  async update(id, budgetData) {
    await delay();
    const index = budgets.findIndex(b => b.Id === parseInt(id));
    if (index !== -1) {
      budgets[index] = { ...budgetData, Id: parseInt(id) };
      return budgets[index];
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = budgets.findIndex(b => b.Id === parseInt(id));
    if (index !== -1) {
      budgets.splice(index, 1);
      return true;
    }
    return false;
  },

  getMonthIndex(monthName) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.indexOf(monthName);
  }
};