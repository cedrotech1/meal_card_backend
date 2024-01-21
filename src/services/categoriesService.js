import db from "../database/models/index.js";
const CategoryModel = db["Categories"];

export const createCategory = async (categoryData) => {
  try {
    return await CategoryModel.create(categoryData);
  } catch (error) {
    throw new Error(`Error creating Category: ${error.message}`);
  }
};

export const checkExistingCategory = async (name) => {
  return await CategoryModel.findOne({
    where: {
      name,
    },
  });
};

export const getAllCategories = async () => {
  return await CategoryModel.findAll();
};

export const deleteOneCategory = async (id) => {
  const categoryToDelete = await CategoryModel.findOne({ where: { id } });
  if (categoryToDelete) {
    await CategoryModel.destroy({ where: { id } });
    return categoryToDelete;
  }
  return null;
};

export const updateOneCategory = async (id, category) => {
  const categoryToUpdate = await CategoryModel.findOne({ where: { id } });
  if (categoryToUpdate) {
    await CategoryModel.update(category, { where: { id } });
    return category;
  }
  return null;
};

export const getOneCategoryWithDetails = async (id) => {
  try {
    return await CategoryModel.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching category details:", error);
    throw error; // You may want to handle the error more appropriately in your application
  }
};
