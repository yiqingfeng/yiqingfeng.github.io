---
title: es5和es6的继承对比分析
tags: JS
date: 2019-02-27 23:34:45
categories: 每日一题
---

原问题为：ES5/ES6 的继承除了写法以外还有什么区别？

### 相关参考：

- [第 7 期：ES5/ES6 的继承除了写法以外还有什么区别？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)
- [Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)
- [Class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)
- [Class Declarations](https://leanpub.com/understandinges6/read#leanpub-auto-class-declarations)


### 自我总结：

声明阶段：

ES5 是通过构造函数来声明一个“类”，在 ES6 中 通过关键字 `Class` 来进行声明。但是 ES5 的构造函数存在变量提升，但是 `Class` 声明不存在变量提升。

```javascript
// es5
console.log(new A()); // A {}
function A(){
    return this;
}

// es6
console.log(new B()); // ReferenceError: B is not defined
Class B {
    constructor() {

    }
}
```

继承：

ES5 通过修改原型链进行继承，ES6 通过关键字`extend`进行继承，但是子类的`constructor`调用时，需要先利用`super`调用父类的构造方法。否则新建实例对象时，会报错。

ES5继承的实质，是通过将父类的方法添加到子类的实例中。

```javascript
// es5
function Super(name) {
    this.name = name || 'nimo';
    return this;
}
Super.prototype.getName = function () {
    return this.name;
};

function Sub(ages) {
    this.ages = ages || 20;
    return this;
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
```
![](/images/es5继承.jpg)

ES6继承的实质，是通过将父类的属性和方法添加到`this`中，即将父类的属性和方法添加到子类实例对象上，即子类的实例其实是基于父类创建的。这也就是为什么在ES6继承中，子类的构造函数必须先调用`super`方法才能调用this。

```javascript
// es6
class Super {
    constructor(name) {
        this.name = name || 'nimo';
    }
    getName() {
        return this.name;
    }
}

class Sub extends Super {
    constructor(ages) {
        super();
        this.ages = ages || 20;
    }
}
```
![](/images/es6继承.jpg)