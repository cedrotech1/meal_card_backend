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
        email: "admin@gmail.com",
        phone: "1234567890",
        role: "superadmin",
        status: "active",
        password: hashedPasswordAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "tresor",
        lastname: "alain",
        email: "tresor1@example.com",
        phone: "9876543210",
        role: "restaurentadmin",
        status: "active",
        restaurents: "1",
        password: hashedPasswordResAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "kamana",
        lastname: "kamanzi",
        email: "kamana@example.com",
        phone: "9876543230",
        role: "employee",
        status: "active",
        restaurents: "1",
        password: hashedPasswordResAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "tresor",
        lastname: "alain",
        email: "alain@example.com",
        phone: "9876543260",
        role: "employee",
        status: "active",
        restaurents: "2",
        password: hashedPasswordResAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "mukurarinda",
        lastname: "alain",
        email: "mukurarinda@example.com",
        phone: "9576543210",
        role: "customer",
        status: "active",
        restaurents: null,
        password: hashedPasswordResAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "byungura",
        lastname: "danny",
        email: "byungura@example.com",
        phone: "2876543210",
        role: "customer",
        status: "active",
        restaurents: null,
        password: hashedPasswordResAdmin,
        gender: "male",
        address: "huye/tumba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
