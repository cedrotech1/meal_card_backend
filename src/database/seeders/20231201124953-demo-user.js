"use strict";
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10; // Number of salt rounds for bcrypt

    // Hashed passwords for different users
    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);
    const hashedPasswordResAdmin = await bcrypt.hash("12345", saltRounds);
    // const hashedPasswordStudent = await bcrypt.hash("student123", saltRounds);
    // const hashedPasswordLecturer = await bcrypt.hash("lecturer123", saltRounds);

    return queryInterface.bulkInsert("Users", [
      {
        firstname: "Root",
        lastname: "User",
        email: "root@example.com",
        phone: "1234567890",
        role: "superadmin",
        status: "active",
        password: hashedPasswordAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "restaurentadmin",
        lastname: "User2",
        email: "restaurentadmin@example.com",
        phone: "9876543210",
        role: "restaurentadmin",
        status: "active",
        password: hashedPasswordResAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
