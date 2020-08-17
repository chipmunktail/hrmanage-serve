'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Performances', [{
      month: new Date().getMonth(),
      rankDate: new Date(),
      rankLevel: 'A',
      userId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      month: new Date().getMonth(),
      rankDate: new Date(),
      rankLevel: 'A',
      userId: 2,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      month: new Date().getMonth(),
      rankDate: new Date(),
      rankLevel: 'B',
      userId: 3,
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Performances', null, {});
  }
};

