'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JobUsers', [{
      jobId: 1,
      userId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      jobId: 1,
      userId: 2,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      jobId: 2,
      userId: 3,
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JobUsers', null, {});
  }
};

