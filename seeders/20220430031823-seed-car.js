"use strict";

const cars = require("../data/car.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Cars", cars, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
