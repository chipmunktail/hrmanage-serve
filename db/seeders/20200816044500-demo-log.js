'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logs', [{
      logDate: new Date(),
      userName: 'user1',
      roleName: 'admin',
      operateType: 'login',
      userId: 1,
      params: '{}',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      logDate: new Date(),
      userName: 'user2',
      roleName: 'admin',
      operateType: 'delete user',
      userId: 2,
      params: '{}',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      logDate: new Date(),
      userName: 'user3',
      roleName: 'admin',
      operateType: 'logout',
      userId: 3,
      params: '{}',
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logs', null, {});
  }
};
