'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendanceCalendars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calendarId: {
        type: Sequelize.INTEGER
      },
      calendarDate: {
        type: Sequelize.DATE
      },
      dayType: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendanceCalendars');
  }
};