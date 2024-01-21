"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        restaurent: "1",
        name: "vip",
        description: "category description for .......",
        price: "vip",
        status: "available",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        restaurent: "2",
        name: "vip",
        description: "category description for .......",
        price: "vip",
        status: "available",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
