'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auths', [{
      code: 'SYSTEMMANAGE',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      code: 'HRMANAGE',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      code: 'PRIVATE',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
