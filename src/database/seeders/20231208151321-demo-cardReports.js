"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("cardReports", [
      {
        cardid: "1",
        plates: "2",
        date: "1/1/2023",
        time: "10:00 AM",
        status: "used",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        cardid: "2",
        plates: "1",
        date: "1/2/2023",
        time: "10:30 AM",
        status: "used",
        createdAt: new Date(),
        updatedAt: new Date(),
      },


    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cardReports", null, {});
  },
};
