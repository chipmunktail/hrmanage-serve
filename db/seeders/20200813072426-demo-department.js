'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Departments', [{
      name: 'INFOMATION',
      managerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'FINANCIAL',
      managerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'TECHNOLOGY',
      managerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};

