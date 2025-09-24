import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = () => new Promise(resolve => setTimeout(resolve, 200));

export const categoryService = {
  async getAll() {
    await delay();
    return [...categories];
  },

  async getByType(type) {
    await delay();
    return categories.filter(category => category.type === type);
  },

  async getById(id) {
    await delay();
    return categories.find(category => category.Id === parseInt(id));
  }
};