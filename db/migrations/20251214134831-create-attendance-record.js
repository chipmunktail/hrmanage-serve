'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendanceRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recordId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      checkDate: {
        type: Sequelize.DATE
      },
      checkInTime: {
        type: Sequelize.DATE
      },
      checkOutTime: {
        type: Sequelize.DATE
      },
      checkInType: {
        type: Sequelize.INTEGER
      },
      checkOutType: {
        type: Sequelize.INTEGER
      },
      location: {
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
    await queryInterface.dropTable('attendanceRecords');
  }
};