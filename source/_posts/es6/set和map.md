---
title: set和map
categories: 每日一题
date: 2019-04-25 14:27:33
tags: [JS, ES6]
---

> 请介绍 Set \ Map 之间的区别？


### Map

JS 中的对象（`Object`），本质是键值对的集合（Hash结构），传统上只能使用字符串作为键值（限制）。为了解决对象的这种限制，`ES6` 提供了 `Map` 数据结构。
`Map` 类似于对象，也是键值对的集合，但是“键”不再仅限于字符串，包括各种类型的值（包括对象）都能作为 `Map` 的键。简单来说就是，`Object` 是 **字符串 - 值**，而 `Map` 是 **值 - 值**。

```javascript
const object = {};
object[false] = 1; // object['false']

const map = new Map([
    ['true', 1],
    [true, 2]
]);
map.size // 2
map.has('true') // true
map.get('true') // 1
```

### 相关讨论：

- 

### 相关阅读：

- []()

