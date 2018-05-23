# 目录结构说明
1. models: 存放操作数据库的文件
2. public: 存放静态文件，如样式、图片
3. routes: 存放路由文件
4. views: 存放模板文件
5. index.js: 程序主文件
6. package.json: 存储项目名、描述、作者、依赖等等信息



# 安装依赖模块说明
1. express: web 框架
2. express-session: session 中间件
3. connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
4. connect-flash: 页面通知的中间件，基于 session 实现
5. ejs: 模板
6. express-formidable: 接收表单及文件上传的中间件
7. config-lite: 读取配置文件
8. marked: markdown 解析
9. moment: 时间格式化
10. mongolass: mongodb 驱动
11. objectid-to-timestamp: 根据 ObjectId 生成时间戳
12. sha1: sha1 加密，用于密码加密
13. winston: 日志
14. express-winston: express 的 winston 日志中间件



# EditorConfig配置的格式
1. 使用 2 个空格缩进
2. tab 长度也是 2 个空格
3. trim_trailing_whitespace 用来删除每一行最后多余的空格
4. insert_final_newline 用来在代码最后插入一个空的换行 



# Mongolass的schema用法
1. 查阅 another-json-schema https://github.com/nswbmw/another-json-schema



# mocha 和 supertest
1. mocha 和 suptertest 是常用的测试组合，通常用来测试 restful 的 api 接口，这里我们也可以用来测试我们的博客应用。
2. 在 myblog 下新建 test 文件夹存放测试文件
3. 这里以注册为例讲解 mocha 和 supertest 的用法



# 测试覆盖率
1. 我们写测试肯定想覆盖所有的情况（包括各种出错的情况及正确时的情况），但光靠想需要写哪些测试是不行的，总也会有疏漏，最简    单的办法就是可以直观的看出测试是否覆盖了所有的代码，这就是测试覆盖率，即被测试覆盖到的代码行数占总代码行数的比例。
2. 注意：即使测试覆盖率达到 100% 也不能说明你的测试覆盖了所有的情况，只能说明基本覆盖了所有的情况。
3. istanbul 是一个常用的生成测试覆盖率的库，它会将测试的结果报告生成 html 页面，并放到项目根目录的 coverage 目录下。



# 项目启动命令
1. 启动MongoDB：`net start MongoDB`
2. 启动博客：`supervisor index`
3. 查看端口占用情况：`netstat -ano | grep 8083`



学习到的位置：



# window系统与其他系统不同之处：
1. pm2配置部分（4.15.2章节）
   ### window系统
   ```
   npm install --save-dev cross-env
   "start": "cross-env NODE_ENV=production pm2 start index.js --name 'myblog'"
   ```

   ### 其他系统
   ```
   "scripts": {
      "test": "istanbul cover _mocha",
      "start": "NODE_ENV=production pm2 start index.js --name 'myblog'"
    }
   ```



