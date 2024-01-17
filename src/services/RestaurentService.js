import db from "../database/models/index.js";
const RestaurentModel = db["Restaurent"];


export const createRestaurent = async (RestaurentData) => {
  try {
    return await RestaurentModel.create(RestaurentData);
  } catch (error) {
    throw new Error(`Error creating Restaurent: ${error.message}`);
  }
};

export const checkExistingRestaurent = async (name) => {
  return await RestaurentModel.findOne({
    where: {
      name,
    },
  });
};

export const getAllRestaurentes = async () => {
  return await RestaurentModel.findAll();
};

