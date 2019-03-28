---
title: express源码解析
date: 2019-03-27 14:22:18
tags: [node, JS]
categories: 原理说明
---

> Express 是一个极简框架，非常灵活可靠，不关注程序架构，不会引入那些无用的垃圾代码。与其他框架相比这种简洁不可避免导致了部分功能缺失。

Express 对 Node 的封装非常棒，主要来源于以下几个设计：

- 中间件
- 路由
- 子应用
- API函数易用





> express 是一款轻快简洁的 node.js web 框架。其使用范围相当广泛，在web开发中，可以帮助我们快速开发web应用。

通过 express 可以创建一个项目。 `express -e blog`

### 一、整体分析

在 node 中，我们可以轻松启用一个服务器。

```javascript
http.createServer((req, res) => {
    res.send('hello world!');
    res.end();
}).listen(3000);
```

但是在实际web应用开发过程中，我们需要服务器能监听各种不同的请求，并作出各自的处理。而 **express** 做的就是这样的事情。

**express** 提供路由、中间件、引擎模板。帮助我们快速开发web应用。

### 二、中间件 & 路由

**中间件** 是一种拦截器的思想，用于在特定的输入输出之前添加一些额外的处理。中间件的设计思想能够为许多架构提供灵活而强大的拓展性。

**中间件设计模型：**

- **尾递归：** 中间件一个接一个的顺序执行, 习惯于将response响应写在最后一个中间件中；例如`express`。
- **洋葱圈：** 支持 **generator**, 执行顺序是“洋葱圈”模型。 例如`koa`（node web框架）。

![](/images/洋葱圈.png)

在 **Express** 中，中间件的本质就是一个函数，主要用于处理请求响应过程中执行一些操作。

![](/images/express中间件.png)

### 相关阅读

- [Express 实战（一）：概览](https://juejin.im/post/59bce35f5188257e70531ec0#heading-9)
- [Express 实战（四）：中间件](https://juejin.im/post/59bce48ef265da066c22fa3a)
- [express源码阅读](https://juejin.im/post/59c0ef425188257e934966ad)
- [Express中间件原理详解](https://juejin.im/post/5aa345116fb9a028e52d7217)
- [redux, koa, express 中间件实现对比解析](https://juejin.im/post/5b9a23a45188255c9c751b07)