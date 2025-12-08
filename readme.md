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
./node_modules/.bin/sequelize db:seed:all

# sequelize 查看所有指令
./node_modules/.bin/sequelize