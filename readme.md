solution: 

```shell
# 创建数据库
 CREATE DATABASE IF NOT EXISTS hm DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

# 生成初始数据
PS D:\lib\hrmanage-serve> ./node_modules/.bin/sequelize db:seed

Sequelize CLI [Node: 12.14.0, CLI: 6.2.0, ORM: 6.3.4]

Loaded configuration file "config\database.json".
Using environment "development".
PS D:\lib\hrmanage-serve> ./node_modules/.bin/sequelize db:seed:all
```

# 运行 docker mysql

docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d hjdtl/hm-mysql:v0.0.1

# 运行已存在的docker容器
docker start container-name
    先执行命令查看容器名称（NAMES）：docker container ls

# sequelize 建库
./node_modules/.bin/sequelize db:create
    手动指定文件路径：./node_modules/.bin/sequelize db:create --config ./path/to/config.json
    指定环境：./node_modules/.bin/sequelize db:create --env test

# sequelize 建表
./node_modules/.bin/sequelize db:migrate


# sequelize 生成数据
<!-- 运行所有数据文件 -->
./node_modules/.bin/sequelize db:seed:all
<!-- 运行指定数据文件 -->
npx sequelize-cli db:seed --seed 20200811072748-demo-auth.js 


# sequelize 查看所有指令
./node_modules/.bin/sequelize




npx sequelize-cli model:generate --name WeChat --attributes billCreateAt:date,describe:string,counterparty:string,product:string,receiveOrPay:string,amount:integer,payWay:string,status:string,billNo:string,merchantNo:string,remark:string,deletedAt:date

<!-- 打卡记录 -->
<!-- 上班打卡类型（0 - 正常，1 - 迟到，2 - 缺卡） -->
<!-- 下班打卡类型（0 - 正常，1 - 早退，2 - 缺卡）	 -->
npx sequelize-cli model:generate --name attendanceRecord --attributes recordId:integer,userId:integer,checkDate:date,checkInTime:date,checkOutTime:date,checkInType:integer,checkOutType:integer,location:string

<!-- 考勤计划（日历休息日） -->、
<!-- 日期类型（0 - 工作日，1 - 休息日，2 - 法定节假日）	 -->
npx sequelize-cli model:generate --name attendanceCalendar --attributes calendarId:integer,calendarDate:date,dayType:integer,remark:string

<!-- 补卡表 -->
<!-- 补卡类型（0 - 上班卡，1 - 下班卡）	 -->
npx sequelize-cli model:generate --name cardReissue --attributes reissueId:integer,userId:integer,reissueDate:date,reissueType:integer,actualTime:date,reason:string,auditStatus:integer
