---
title: express入门使用
categories: 每日一题
date: 2019-03-28 15:11:30
tags: [node, JS]
---

Express是基于Node.js平台，快速、开放、极简的Web开发框架，合理利用express能够提高我们的开发效率。
<!-- more -->

> express 是一款轻量高效的 node web 开发框架。通过对 node 内置模块的封装和拓展，提高开发者构建一个 web 应用的效率。类似的框架还有 **koa**（**koa**和**express**是同一个开发团队）。

### 一、Express概述

Express开发web框架的优点：

- **易上手：** express 对 node 底层API进行了适度封装，减少了程序的复杂度。
- **性能好：** nodejs最初就是为了开发高性能web服务器而被设计出来的。
- **高拓展：** express 是基于中间件的开发模式，对请求处理进行了拆分，方便应用模块化和后期维护。

以下是 node 请求的一个流程图：
![](/images/node-web-flow-chat.jpg)

express 在其中的作用就是协助开发者处理圆圈中的请求处理函数。与上图相比，express 处理流程如下：
![](/images/express-web-flow-chat.jpg)

和之前处理相比，express 将一个大型的 request 请求拆分成了多个中间件，依次处理。

### 二、Express快速开始

express 官方提供了一个生成器 `express-generator` 可用于快速构建一个 web 应用。

```bash
npm install -g express-generator
express --view=ejs myapp
cd myapp
npm install
```

### 三、中间件 & 路由

Express 对中间件分为以下几类：

- 应用级中间件 （`app.use()`、`app.METHOD()`）
- 路由级中间件 （通过`express.Router()`创建，`router.use()`、`router.METHOD()`）
- 错误处理中间件 （通过中间件四个参数识别 `(err, req, res, next) => {}`）
- 内置中间件
- 第三方中间件

以下是 应用级中间件的一个使用说明：
![](/images/express中间件.png)

在利用 express 进行实际开发过程中，开发者只要能按照中间件的规则，就能进行快速开发。

express支持四种类型路由：

- 字符串类型 `app.get('/book', (req, res, next) => { });`  eg. `/book`
- 字符串模式类型  `app.get('/user/*man', (req, res, next) => { });` eg. `/user/man, /user/woman`
- 正则表达式类型  `app.get('/animals?$/', (req, res, next) => { });` eg. `/animal, /animals`
- 参数类型 `app.get('/employee/:uid/:age', (req, res, next) => { });` eg. `/111/30，返回 {"uid": 111, "age": 30}`

> **注意：**
> 当应用越发复杂时，最好利用`express.Router()`进行路由拆分。
> express 中间件的执行顺序为注册的先后顺序，因此建议将错误处理中间件在最后注册。

### 四、常用中间件

Middleware module | Description | Replaces built-in function (Express 3)
--- | --- | ---
body-parser | Parse HTTP request body. See also: body, co-body, and raw-body. | express.bodyParser
compression | Compress HTTP responses. | express.compress
connect-rid | Generate unique request ID. | NA
cookie-parser | Parse cookie header and populate req.cookies. See also cookies and keygrip. | express.cookieParser
cookie-session | Establish cookie-based sessions. | express.cookieSession
cors | Enable cross-origin resource sharing (CORS) with various options. | NA
csurf | Protect from CSRF exploits. | express.csrf
errorhandler | Development error-handling/debugging. | express.errorHandler
method-override | Override HTTP methods using header. | express.methodOverride
morgan | HTTP request logger. | express.logger
multer | Handle multi-part form data. | express.bodyParser
response-time | Record HTTP response time. | express.responseTime
serve-favicon | Serve a favicon. | express.favicon
serve-index | Serve directory listing for a given path. | express.directory
serve-static | Serve static files. | express.static
session | Establish server-based sessions (development only). | express.session
timeout | Set a timeout period for HTTP request processing. | express.timeout
vhost | Create virtual domains. | express.vhost