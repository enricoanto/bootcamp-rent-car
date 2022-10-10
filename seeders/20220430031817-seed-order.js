"use strict";
const orders = require("../data/order.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", orders, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
