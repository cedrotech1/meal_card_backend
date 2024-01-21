"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Restaurent extends Model {
    static associate(models) {

      Restaurent.hasMany(models.Users, {
        foreignKey: "restaurents",
        as: "restuser",
      });


      Restaurent.hasMany(models.Cards, { foreignKey: "restaurent", as: "restaurantCards" });
      Restaurent.hasMany(models.Categories, { foreignKey: "restaurent", as: "restaurantCategories" });





    }
  }

  Restaurent.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Restaurents",

    }
  );

  return Restaurent;
};
