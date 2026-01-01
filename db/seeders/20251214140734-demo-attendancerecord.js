'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('attendanceRecords', [
     {
        recordId: 1,
        userId: 1,
        checkDate: '2025-12-11 08:26:55',
        checkInTime: '2025-12-11 08:26:55',
        checkOutTime: '2025-12-11 18:00:30',
        checkInType: 0,
        checkOutType: 0,
        location: '',
       createdAt: new Date(),
       updatedAt: new Date()
     },
    {
        recordId: 2,
        userId: 1,
        checkDate: '2025-12-12 08:59:25',
        checkInTime: '2025-12-12 08:59:25',
        checkOutTime: '2025-12-12 18:20:31',
        checkInType: 0,
        checkOutType: 0,
        location: '',
       createdAt: new Date(),
       updatedAt: new Date()
     },
          {
        recordId: 3,
        userId: 1,
        checkDate: '2025-12-15 09:05:10',
        checkInTime: '2025-12-15 09:05:10',
        checkOutTime: '2025-12-15 18:00:30',
        checkInType: 1,
        checkOutType: 0,
        location: '',
       createdAt: new Date(),
       updatedAt: new Date()
     },
          {
        recordId: 4,
        userId: 1,
        checkDate: '2025-12-16 08:53:15',
        checkInTime: '2025-12-16 08:53:15',
        checkOutTime: '2025-12-16 17:58:20',
        checkInType: 0,
        checkOutType: 1,
        location: '',
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendanceRecords', null, {});
  }
};
