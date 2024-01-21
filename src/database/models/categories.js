"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {

      Categories.belongsTo(models.Restaurents, { foreignKey: "restaurent", as: "categoryRestaurant" });


    }
  }

  Categories.init(
    {
      restaurent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Categories",

    }
  );

  return Categories;
};