import goalsData from "@/services/mockData/goals.json";

let goals = [...goalsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const goalService = {
  async getAll() {
    await delay();
    return [...goals].sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
  },

  async getById(id) {
    await delay();
    return goals.find(goal => goal.Id === parseInt(id));
  },

  async create(goalData) {
    await delay();
    const maxId = Math.max(...goals.map(g => g.Id), 0);
    const newGoal = {
      ...goalData,
      Id: maxId + 1,
      currentAmount: 0
    };
    goals.push(newGoal);
    return newGoal;
  },

  async update(id, goalData) {
    await delay();
    const index = goals.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      goals[index] = { ...goalData, Id: parseInt(id) };
      return goals[index];
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = goals.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      goals.splice(index, 1);
      return true;
    }
    return false;
  },

  async contribute(id, amount) {
    await delay();
    const index = goals.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      goals[index].currentAmount += amount;
      if (goals[index].currentAmount > goals[index].targetAmount) {
        goals[index].currentAmount = goals[index].targetAmount;
      }
      return goals[index];
    }
    return null;
  }
};