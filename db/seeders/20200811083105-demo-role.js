'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      authCode: '[SYSTEMMANAGE]',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'hr',
      authCode: '[HRMANAGE]',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'developer',
      authCode: '[SYSTEMMANAGE,PRIVATE]',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
