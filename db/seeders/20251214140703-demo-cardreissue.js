'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('cardReissues', [
     {
        reissueId: 1,
        userId: 1,
        reissueDate: '2025-12-12 09:26:55',
        reissueType: 0,
        actualTime: '2025-12-12 09:26:55',
        reason: '忘打卡',
        auditStatus: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
        reissueId: 2,
        userId: 2,
        reissueDate: '2025-12-12 09:26:55',
        reissueType: 0,
        actualTime: '2025-12-12 09:26:55',
        reason: '忘打卡22',
        auditStatus: 2,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
        reissueId: 3,
        userId: 3,
        reissueDate: '2025-12-12 09:26:55',
        reissueType: 1,
        actualTime: '2025-12-12 09:26:55',
        reason: '忘打卡33',
        auditStatus: 3,
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cardReissues', null, {});
  }
};
