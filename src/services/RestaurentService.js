import { Sequelize } from 'sequelize';
import db from "../database/models/index.js";
const RestaurentModel = db["Restaurents"];
const CategoryModel = db["Categories"];

export const getOneRestaurentWithDetails = async (id) => {
  try {
    return await RestaurentModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: CategoryModel,
          as: "restaurantCategories",
          on: Sequelize.literal('"Restaurents"."id" = "restaurantCategories"."restaurent"::INTEGER'), // Add explicit cast
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    throw error; // You may want to handle the error more appropriately in your application
  }
};

export const getAllRestaurentes = async () => {
  try {
    return await RestaurentModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: "restaurantCategories", // This should match the alias used in the association
          on: Sequelize.literal('"Restaurents"."id" = "restaurantCategories"."restaurent"::INTEGER'), // Add explicit cast
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching all restaurants with categories:", error);
    throw error; // You may want to handle the error more appropriately in your application
  }
};


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

// export const getAllRestaurentes = async () => {
//   return await RestaurentModel.findAll();
// };

export const deleteOneRestaurent = async (id) => {
  const restToDelete = await RestaurentModel.findOne({ where: { id } });
  if (restToDelete) {
    await RestaurentModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await RestaurentModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await RestaurentModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

