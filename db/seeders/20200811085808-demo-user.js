'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      displayName: 'user1',
      name: 'user1',
      roleId: 1,
      jobId: 1,
      departmentId: 1,
      freeHour: 0,
      salaryId: 1,
      email: 'user1@t.com',
      enable: 1,
      password: '123456',
      gender: 1,
      national: "汉",
      birthDay: new Date(),
      phone: "15000000000",
      address: "详细地址",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      displayName: 'user2',
      name: 'user2',
      roleId: 2,
      jobId: 2,
      departmentId: 2,
      freeHour: 0,
      salaryId: 2,
      email: 'user2@t.com',
      enable: 1,
      password: '123456',
      gender: 0,
      national: "汉",
      birthDay: new Date(),
      phone: "15000000001",
      address: "详细地址1",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      displayName: 'user3',
      name: 'user3',
      roleId: 3,
      jobId: 3,
      departmentId: 3,
      freeHour: 0,
      salaryId: 3,
      email: 'user3@t.com',
      enable: 1,
      password: '123456',
      gender: 0,
      national: "畲",
      birthDay: new Date(),
      phone: "15000000002",
      address: "详细地址2",
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
