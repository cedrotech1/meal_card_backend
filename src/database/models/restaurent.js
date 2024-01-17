"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Restaurent extends Model {
    static associate(models) {
      // Restaurent.hasMany(models.Users, {
      //   foreignKey: "restaurent",
        
      // });
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
    },
    {
      sequelize,
      modelName: "Restaurent",

    }
  );

  return Restaurent;
};
