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