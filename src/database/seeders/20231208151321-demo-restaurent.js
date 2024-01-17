"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Restaurent", [
      {
        name: "Kiza",
        address: "huye/ngoma",
        description: "restoura for student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "umucyo",
        address: "huye/tumba",
        description: "restoura for all",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Restaurent", null, {});
  },
};
