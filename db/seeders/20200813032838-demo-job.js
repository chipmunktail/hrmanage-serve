'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Jobs', [{
      name: 'backend developer',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'ui design',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'frontend developer',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Jobs', null, {});
  }
};

