"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cards", [
      {
        restaurent: "1",
        category: "1",
        userid: "1",
        times: "30",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        restaurent: "1",
        category: "1",
        userid: "2",
        times: "30",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cards", null, {});
  },
};
