---
title: JS运算符
categories: 每日一题
date: 2019-04-12 11:32:00
tags: JS
---

在JavaScript这门编程语言中，存在着各种各样的运算符，用于应对各种各样的计算。

但是当这些运算符聚集在一起的时候，运算符的优先级和规则影响着运算结果。

<!--more-->

### 一、 运算符之间的优先级

- 赋值运算符(Assignment operators)
- 比较运算符(Comparison operators)
- 算数运算符(Arithmetic operators)
- 位运算符(Bitwise operators)
- 逻辑运算符(Logical operators)
- 字符串运算符(String operators)
- 条件（三元）运算符(Conditional operator)
- 逗号运算符(Comma operator)
- 一元运算符(Unary operators) 
- 关系运算符(Relational operator)

详细的优先级先后顺序可在 [JavaScript 参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) 中查找。


### 二、 运算符的结合性

优先级决定表达式中的计算执行顺序。而结合性则是决定相同优先级运算符的执行顺序。结合结合性主要是分为左结合和右结合。因此，表达式中运算执行的规则为：**先按照优先级顺序执行，当优先级相同时，按照结合性顺序执行。**

例如：
- 左结合 `1 + 2 + 3` 等价于 `(1 + 2) + 3` 
- 右结合 `a = b = 1` 等价于 `a = (b = 1)`

下面我们直接看一些前端试题：

### 二：一些前端试题

#### 1. 优先级的坑

```javascript
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing'); 
```

> 解析：
> 输出表达式 `'Value is ' + (val === 'smtg') ? 'Something' : 'Nothing'` 中，括号运算符 > 加号 > 条件运算符，因此其等价于 `('Value is ' + (val === 'smtg')) ? 'Something' : 'Nothing'`;
> 结果即为：**"Something"**

#### 2. 连续赋值的坑

```javascript
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b.x);
```

> 解析：
> 1. `var a = {n: 1}; var b = a;` 表明 `a`和`b`两个变量都指向了对象`{n: 1}`。
> 2. `a.x = a = {n: 2}` 表达式中存在两类运算符，成员运算符 > 赋值运算符。**注意，此时{n: 1} 在内存中变为 {n: 1, x: undefined}, a.x 指向的是该对象的 x，等待被赋值**，然后`a = {n: 2}`执行，`a`指向对象`{n: 2}`, `a`发生了指向变更，但也不再影响此刻中的 `a.x`（之前已经对其进行了指向确定）。随后 `{n: 1, x: undefined}` 中的 `x`，被赋值为 `a`。
> 因此：`a 指向 {n: 2}`，`b` 指向 `{n: 1, x: a}`。
> 结果即为：a.x: `undefined`，b.x: `{n: 2}`

### 三、相关阅读

- [MDN 表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [MDN 运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [javascript面试题，关于连续赋值的坑](https://www.zhihu.com/question/41220520)

### 四、汇总表（来自MDN）

优先级 | 运算类型 | 关联性 | 运算符
------| ------- | ------ | ------
20 | 圆括号              | n/a | `( … )`
19 | 成员访问            | 从左到右 | `… . …`
   | 需计算的成员访问     | 从左到右 | `… [ … ]`
   | new (带参数列表)    | n/a     | `new … ( … )`
   | 函数调用            | 从左到右 | `… ( … )`
18 | new (无参数列表)    | 从右到左 | `new …`
17 | 后置递增(运算符在后) | n/a     | `… ++`
   | 后置递减(运算符在后) |         | `… --`
16 | 逻辑非              | 从右到左 | `! …`
   | 按位非	             |         | `~ …`
   | 一元加法            |         | `+ …`
   | 一元减法            |         | `- …`
   | 前置递增            |         | `++ …`
   | 前置递减            |         | `-- …`
   | typeof             |         | `typeof …`
   | void               |         | `void …`
   | delete             |         | `delete …`
   | await              |         | `await …`
15 | 幂                 | 从右到左 | `… ** …`
14 | 乘法               | 从左到右 | `… * …`
   | 除法               |         | `… / …`
   | 取模               |         | `… % …`
13 | 加法               | 从左到右 | `… + …`
   | 减法               |         | `… - …`
12 | 按位左移           | 从左到右 | `… << …`
   | 按位右移           |         | `… >> …`
   | 无符号右移         |         | `… >>> …`
11 | 小于              | 从左到右 | `… < …`
   | 小于等于           |         | `… <= …`
   | 大于               |         | `… > …`
   | 大于等于           |         | `… >= …`
   | in                 |         | `… in …`
   | instanceof         |         | `… instanceof …`
10 | 等号               | 从左到右 | `… == …`
   | 非等号             |         | `… != …`
   | 全等号             |         | `… === …`
   | 非全等号           |         | `… !== …`
 9 |按位与              | 从左到右 | `… & …`
 8 | 按位异或           | 从左到右 | `… ^ …`
 7 | 按位或             | 从左到右 | … &#166; …
 6 | 逻辑与             | 从左到右 | `… && …`
 5 | 逻辑或             | 从左到右 | … &#166;&#166; …
 4 | 条件运算符         | 从右到左 | `… ? … : …`
 3 | 赋值               |从右到左 | `… = …`
   |                    |         | `… += …`
   |                    |         | `… -= …`
   |                    |         | `… *= …`
   |                    |         | `… /= …`
   |                    |         | `… %= …`
   |                    |         | `… <<= …`
   |                    |         | `… >>= …`
   |                    |         | `… >>>= …`
   |                    |         | `… &= …`
   |                    |         | `… ^= …`
   |                    |         | … &#166;= …
 2 | yield              | 从右到左 | `yield …`
   | yield*             |         | `yield* …`
 1 | 展开运算符          | n/a     | `... …`
 0 | 逗号               | 从左到右 | `… , …`

> 优先级数据越大越优先执行。