"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Restaurents, { foreignKey: "restaurents", as: "restuser" });
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.ENUM("customer", "superadmin", "restaurentadmin", "employees"),
      restaurents: DataTypes.STRING,
      status: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return User;
};
