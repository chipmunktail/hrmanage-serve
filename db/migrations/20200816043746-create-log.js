'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logDate: {
        type: Sequelize.DATE
      },
      userName: {
        type: Sequelize.STRING
      },
      roleName: {
        type: Sequelize.STRING
      },
      operateType: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      params: {
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
    await queryInterface.dropTable('Logs');
  }
};