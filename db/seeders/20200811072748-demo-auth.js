'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auths', [{
      code: 'SYSTEM',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      code: 'HRM',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      code: 'PRI',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
