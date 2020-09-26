'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      authCode: 'SYSTEMMANAGE,PRIVATE',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'hr',
      authCode: 'HRMANAGE,PRIVATE',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name: 'developer',
      authCode: 'SYSTEMMANAGE,HRMANAGE,PRIVATE',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
