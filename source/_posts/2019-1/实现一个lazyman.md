---
title: 实现一个lazyman
categories: 每日一题
date: 2019-04-16 23:59:53
tags: JS
---

> 请设计一个 `LazyMan` 类，实现以下功能。

```javascript
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

<!--more-->

### 一、试题分析

`LazyMan` 类具有的特点有：

- 无需`new`关键字便可创建对象。
- 所有方法支持链式调用。
- `eat` 方法并不是立即执行。

### 二、我的实现

```javascript
function LazyMan(name) {
    if (!this instanceof LazyMan) {
        return new LazyMan(name);
    }
    this.name = name;
    this.delayTime = 0;
    this.tasks = [];
    console.log(`Hi I am ${this.name}`);
}

LazyMan.prototype.eat = function (foods) {
    return this;
}

LazyMan.prototype.sleep = function (seconds) {
    return this;
}

LazyMan.prototype.sleepFirst = function (seconds) {
    return this;
}
```

### 相关讨论：

- 

### 相关阅读：

- []()

