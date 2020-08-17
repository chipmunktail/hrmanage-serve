'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      authCode: '[SYS]',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'hr',
      authCode: '[HRM]',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'developer',
      authCode: '[SYS,PRI]',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
