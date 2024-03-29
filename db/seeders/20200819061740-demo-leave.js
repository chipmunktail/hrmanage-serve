'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Leaves', [{
      leaveDate:  new Date(),
      leaveStart: new Date(),
      leaveEnd: new Date(),
      sumHour: 3,
      userId: 1,
      remark: "test",
      auditStatus: 4,
      leaveType: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      leaveDate:  new Date(),
      leaveStart: new Date(),
      leaveEnd: new Date(),
      sumHour: 4,
      userId: 2,
      remark: "test",
      auditStatus: 4,
      leaveType: 2,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      leaveDate:  new Date(),
      leaveStart: new Date(),
      leaveEnd: new Date(),
      sumHour: 5,
      userId: 3,
      remark: "test",
      auditStatus: 4,
      leaveType: 3,
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Leaves', null, {});
  }
};

