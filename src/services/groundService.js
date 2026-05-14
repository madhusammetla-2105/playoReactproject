import { groundsData } from '../data/groundsData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const groundService = {
  getAllGrounds: async () => {
    await delay(600);
    return [...groundsData];
  },

  getGroundById: async (id) => {
    await delay(400);
    const ground = groundsData.find(g => g.id === id);
    if (!ground) throw new Error("Ground not found");
    return ground;
  }
};
