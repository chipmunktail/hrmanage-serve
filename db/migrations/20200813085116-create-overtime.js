'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Overtimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      overtimeDate: {
        type: Sequelize.DATE
      },
      overtimeStart: {
        type: Sequelize.DATE
      },
      overtimeEnd: {
        type: Sequelize.DATE
      },
      sumHour: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      auditStatus: {
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
    await queryInterface.dropTable('Overtimes');
  }
};