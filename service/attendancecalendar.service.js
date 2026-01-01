// var models = require('../db/models');
const { attendanceCalendar } = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;

exports.getAttendanceCalendars = async (req) => { 
}

exports.createAttendanceCalendar = async (req) => { 
}

exports.deleteAttendanceCalendar = async (req) => { 
}

exports.updateAttendanceCalendar = async (req) => { 
}

// 导入考勤日历
exports.importAttendanceCalendar = async (body) => { 
  try {
    const calendarList = body; // 格式：[{calendarDate: '2025-01-01', dayType: 2, remark: '元旦'}, ...]
    console.log('Importing attendance calendar:', calendarList);
    // 统一格式化日期为 YYYY-MM-DD 格式用于比较
    const dates = calendarList.map(item => {
      if (typeof item.calendarDate === 'string') {
        return item.calendarDate; // 已经是 YYYY-MM-DD 格式
      } else if (item.calendarDate instanceof Date) {
        return item.calendarDate.toISOString().split('T')[0]; // 转换为 YYYY-MM-DD
      }
      return item.calendarDate;
    });
    
    // 使用 DATE 函数进行日期比较，忽略时间部分
    await attendanceCalendar.destroy({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('calendarDate')),
        { [Op.in]: dates }
      )
    });
    // 批量创建
    const result = await attendanceCalendar.bulkCreate(calendarList);
    return { status: true, result }
  } catch (err) {
    return { status: false, result: err.message }
  }
}

// 查询指定日期范围的日历
exports.getCalendarByRange = async (query) => {
  try {
    let { startDate, endDate } = query;
    // 处理结束日期，使其包含整天的数据
    if (endDate) {
      // 如果 endDate 是 "YYYY-MM-DD" 格式，调整为当天的最后一刻
      if (typeof endDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        endDate = `${endDate} 23:59:59`;
      }
    }
    const calendars = await attendanceCalendar.findAll({
      where: {
        calendarDate: { [Op.between]: [startDate, endDate] }
      },
      order: [['calendarDate', 'ASC']]
    });
    // 手动格式化日期
    const formattedCalendars = calendars.map(item => {
      const data = item.toJSON();
      if (data.calendarDate) {
        data.calendarDate = data.calendarDate instanceof Date 
          ? data.calendarDate.toISOString().split('T')[0]
          : data.calendarDate;
      }
      return data;
    });
    return { status: true, result: formattedCalendars }
  } catch (err) {
    return { status: false, result: err.message }
  }
};

// 更新单条日历信息
exports.updateCalendar = async (req, res) => {
  try {
    const { calendarId } = req.params;
    const { dayType, remark } = req.body;
    await attendanceCalendar.update(
      { dayType, remark },
      { where: { calendarId } }
    );
    res.json({ code: 200, msg: '更新成功' });
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message });
  }
};

// 校验日期是否为工作日（供其他接口调用）
exports.checkWorkDay = async (date) => {
  const calendar = await attendanceCalendar.findOne({
    where: { calendarDate: date }
  });
  // 无配置时默认视为工作日
  return !calendar || calendar.dayType === 0;
};