'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Overtimes', [{
      overtimeDate:  new Date(),
      overtimeStart: new Date(),
      overtimeEnd: new Date(),
      sumHour: 3,
      userId: 1,
      remark: "test",
      auditStatus: 4,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      overtimeDate:  new Date(),
      overtimeStart: new Date(),
      overtimeEnd: new Date(),
      sumHour: 4,
      userId: 2,
      remark: "test",
      auditStatus: 4,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      overtimeDate:  new Date(),
      overtimeStart: new Date(),
      overtimeEnd: new Date(),
      sumHour: 5,
      userId: 3,
      remark: "test",
      auditStatus: 4,
      createdAt:new Date(),
      updatedAt:new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Overtimes', null, {});
  }
};

