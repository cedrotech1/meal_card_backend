"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Restaurents", [
      {
        name: "Kiza",
        address: "huye/ngoma",
        description: "restoura for student",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "umucyo",
        address: "huye/tumba",
        description: "restoura for all",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Restaurents", null, {});
  },
};
