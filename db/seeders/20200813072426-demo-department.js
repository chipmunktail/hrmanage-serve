'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Departments', [{
      name: 'INFOMATION',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'FINANCIAL',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'TECHNOLOGY',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};

