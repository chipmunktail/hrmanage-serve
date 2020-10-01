'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      jobId: {
        type: Sequelize.INTEGER
      },
      departmentId: {
        type: Sequelize.INTEGER
      },
      freeHour: {
        type: Sequelize.INTEGER
      },
      salaryId: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      enable: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      national: {
        type: Sequelize.STRING
      },
      birthDay: {
        type: Sequelize.DATE
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
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
    await queryInterface.dropTable('Users');
  }
};