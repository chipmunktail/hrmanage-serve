'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Salaries', [{
      salary: 7000,
      userId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      salary: 8000,
      userId: 2,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      salary: 9000,
      userId: 3,
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Salaries', null, {});
  }
};

