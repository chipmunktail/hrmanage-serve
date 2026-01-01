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
   return queryInterface.bulkInsert('attendanceCalendars', [
     {
        calendarId: 1,
        calendarDate: '2025-12-01 09:00:00',
        dayType: 0,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 2,
        calendarDate: '2025-12-02 09:00:00',
        dayType: 0,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 3,
        calendarDate: '2025-12-03 09:00:00',
        dayType: 0,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 4,
        calendarDate: '2025-12-04 09:00:00',
        dayType: 0,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 5,
        calendarDate: '2025-12-05 09:00:00',
        dayType: 0,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 6,
        calendarDate: '2025-12-06 09:00:00',
        dayType: 1,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        calendarId: 7,
        calendarDate: '2025-12-07 09:00:00',
        dayType: 1,
        remark: '',
        createdAt: new Date(),
        updatedAt: new Date()
     },          
   ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attendanceCalendars', null, {});
  }
};
