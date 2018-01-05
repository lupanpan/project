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




学习到的位置：
4.4.1 功能与路由设计
代码已经编写完，index.js 已经写完，在启动时，因为 mongodb 无法启动问题，导致无法运行项目
暂时因为要学 react，公司可能要裁员，这个 react 属于比较着急的
https://github.com/nswbmw/N-blog/blob/master/book/4.4%20功能设计.md#442-会话