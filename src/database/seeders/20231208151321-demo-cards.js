"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cards", [
      {
        
        category: "1",
        userid: "5",
        times: "30",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
     
        category: "2",
        userid: "6",
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
