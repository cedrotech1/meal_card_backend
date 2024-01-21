import db from "../database/models/index.js";
const CardsModel = db["Cards"];


export const createCards = async (CardsData) => {
  try {
    return await CardsModel.create(CardsData);
  } catch (error) {
    throw new Error(`Error creating Cards: ${error.message}`);
  }
};

export const checkExistingCards = async (name) => {
  return await CardsModel.findOne({
    where: {
      name,
    },
  });
};

export const getAllCardses = async () => {
  return await CardsModel.findAll();
};

export const deleteOneCards = async (id) => {
  const restToDelete = await CardsModel.findOne({ where: { id } });
  if (restToDelete) {
    await CardsModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await CardsModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await CardsModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const getOneCardsWithDetails = async (id) => {
  try {
    return await CardsModel.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching campus details:", error);
    throw error; // You may want to handle the error more appropriately in your application
  }
};