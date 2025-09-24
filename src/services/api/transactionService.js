import transactionsData from "@/services/mockData/transactions.json";

let transactions = [...transactionsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const transactionService = {
  async getAll() {
    await delay();
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async getById(id) {
    await delay();
    return transactions.find(transaction => transaction.Id === parseInt(id));
  },

  async create(transactionData) {
    await delay();
    const maxId = Math.max(...transactions.map(t => t.Id), 0);
    const newTransaction = {
      ...transactionData,
      Id: maxId + 1
    };
    transactions.push(newTransaction);
    return newTransaction;
  },

  async update(id, transactionData) {
    await delay();
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      transactions[index] = { ...transactionData, Id: parseInt(id) };
      return transactions[index];
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      transactions.splice(index, 1);
      return true;
    }
    return false;
  },

  async getByDateRange(startDate, endDate) {
    await delay();
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  },

  async getByCategory(category) {
    await delay();
    return transactions.filter(t => t.category === category);
  },

  async getByType(type) {
    await delay();
    return transactions.filter(t => t.type === type);
  }
};