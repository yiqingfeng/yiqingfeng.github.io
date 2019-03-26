---
title: promise
date: 2019-03-20 17:58:00
tags: [JS, 原理]
categories: 每日一题
---

> Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。

### 作业队列

### 

### 实现一个最小程度的promise

```javascript
function CreatePromise(cb) {
    this._state = 'pending'; // 状态
    this._dependencies = []; // 依赖关系
    this._value = null; // 处理数据
    if (typeof cb === 'function') {
        cb && cb(value => {
            this.fulfill(value);
        }, err => {
            this.reject(err);
        });
    }
}

// 完成
CreatePromise.prototype.fulfill = function fulfill(value) {
    if (this._state !== 'pending') {
        throw new Error('Trying to fulfill a non-pending promise!');
    } else {
        this._state = 'fulfilled';
        this._value = value;
        this._dependencies.forEach((item) => {
            item.fulfilled && item.fulfilled(this._value);
        });
    }
}

// 失败
CreatePromise.prototype.reject = function reject(error) {
    if (this._state !== 'pending') {
        throw new Error('Trying to fulfill a non-pending promise!');
    } else {
        this._state = 'rejected';
        this._value = error;
        this._dependencies.forEach((item) => {
            item.rejected && item.rejected(this._value);
        });
    }
}

// 添加依赖 depned  then?
CreatePromise.prototype.depend = function depend(onSuccess, onFailure) {
    var result = new CreatePromise();

    // 操作未完成，将其放入依赖列表
    if (this._state === 'pending') {
        this._dependencies.push({
            fulfilled: function (value) {
                try {
                    var newValue = onSuccess && onSuccess(value);
                    result.fulfill(newValue);
                } catch (err) {
                    result.reject(err);
                }
            },
            rejected: function (error) {
                try {
                    onFailure && onFailure(error);
                } catch (err) {
                    result.reject(err);
                }
            },
        });
    } else {
        if (this._state === 'rejected') {
            try {
                onFailure && onFailure(this._value);
            } catch (err) {
                result.reject(err);
            }
        } else if (this._state === 'fulfilled') {
            try {
                var newValue = onSuccess && onSuccess(this._value);
                result.fulfill(newValue);
            } catch (err) {
                result.reject(err);
            }
        }
    }

    return result;
}

// 并发处理
CreatePromise.prototype.all = function all(p1, p2) {
    var result = new CreatePromise();
    var flag = 0; // 0 表示都未开始，1 表示有一个成功了 2 表示都成功了 -1 表示有一个失败了
    var params = [];
    p1.depend(function (value) {
        flag++;
        params[0] = value;
        if (flag === 1) {
            result.fulfill(params);
        }
    }, function (err) {
        if (flag === -1) return;
        flag = -1;
        s
        result.reject(err);
    });
    p2.depend(function (value) {
        flag++;
        params[1] = value;
        if (flag === 1) {
            result.fulfill(params);
        }
    }, function (err) {
        if (flag === -1) return;
        flag = -1;
        result.reject(err);
    });
    return result;
}

function all() {
    var result = new CreatePromise();
    var flag = 0;
    var len = arguments.length;
    var params = [];

    Array.prototype.slice.call(arguments).forEach(function (p, index) {
        p.depend(function (value) {
            flag++;
            params[index] = value;
            if (flag === len) {
                result.fulfill(params);
            }
        }, function (err) {
            if (flag === -1) return;
            flag = -1;
            result.reject(err);
        });
    });

    return result;
}

// 有一个成功，便返回成功
CreatePromise.prototype.race = function race() {
    var result = new CreatePromise();

    var flag = 0;
    var len = arguments.length - 1;

    Array.prototype.slice.call(arguments).forEach(function (p, index) {
        p.depend(function (value) {
            if (flag !== -1) {
                flag = -1;
                result.fulfill(value);
            }
        }, function (err) {
            if (flag === -1 || flag === len - 1) return;
            flag ++;
            result.reject(err);
        });
    });

    return result;
}
```