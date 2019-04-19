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
    if (!(this instanceof LazyMan)) {
        return new LazyMan(name);
    }
    this.name = name;
    this.delayTime = 0;
    this.tasks = [];
    console.log(`Hi I am ${this.name}`);
    this._ready();
}

LazyMan.prototype._ready = function () {
    setTimeout(() => {
        setTimeout(() => {
            console.log(`等待了${this.delayTime}秒...`);
            this._doTasks();
        }, this.delayTime * 1000);
    }, 0);
}

LazyMan.prototype._doTasks = function () {
    const tasks = this.tasks;
    if (tasks.length === 0) return;
    const {delayTime, callback} = tasks[0];
    setTimeout(() => {
        callback && callback();
        tasks.shift();
        this._doTasks();
    }, delayTime);
}

LazyMan.prototype.eat = function (foods) {
    this.tasks.push({
        delayTime: 0,
        callback() {
            console.log(`I am eating ${foods}`);
        },
    });
    return this;
}

LazyMan.prototype.sleep = function (seconds) {
    if (seconds >= 0) {
        this.tasks.push({
            delayTime: seconds * 1000,
            callback() {
                console.log(`等待了${seconds}秒...`)
            }
        });
    }
    return this;
}

LazyMan.prototype.sleepFirst = function (seconds) {
    if (seconds > 0) {
        this.delayTime = seconds;
    }
    return this;
}
```

### 三、实现思路细节优化

- `eat`、`sleep`、`sleepFirst` 均会向任务列表插入回调
- 简化整个任务队列的执行

```javascript
function LazyMan(name) {
    if (!(this instanceof LazyMan)) {
        return new LazyMan(name);
    }
    this.name = name;
    this.tasks = [];
    console.log(`Hi I am ${this.name}`);
    // 让任务队列注册后自动执行
    setTimeout(() => {
        this.next();
    }, 0);
}

LazyMan.prototype.next = function () {
    const task = this.tasks.shift();
    task && task();
}

LazyMan.prototype.eat = function (foods) {
    this.tasks.push(() => {
        console.log(`I am eating ${foods}`);
        this.next();
    });
    return this;
}

LazyMan.prototype.sleep = function (seconds) {
    if (seconds >= 0) {
        this.tasks.push(() => {
            setTimeout(() => {
                console.log(`等待了${seconds}秒...`);
                this.next();
            }, seconds * 1000);
        });
    }
    return this;
}

LazyMan.prototype.sleepFirst = function (seconds) {
    if (seconds > 0) {
        this.tasks.unshift(() => {
            setTimeout(() => {
                console.log(`等待了${seconds}秒...`);
                this.next();
            }, seconds * 1000);
        });
    }
    return this;
}
```

### 四、相关讨论：

- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/98
