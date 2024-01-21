"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    static associate(models) {
     
      

  Cards.belongsTo(models.Restaurents, { foreignKey: "restaurent", as: "cardRestaurant" });
  Cards.belongsTo(models.Users, { foreignKey: "userid", as: "cardUser" });



    }
  }

  Cards.init(
    {
      restaurent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      times: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cards",

    }
  );

  return Cards;
};
