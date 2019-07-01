---
title: 实现一个简易的 MVVM 双向数据绑定
date: 2019-07-01 11:10:31
tags: [JS, VUE]
categories: 基础原理
---

如果你想了解 MVVM 双向数据绑定，那你之前最好有 Angular.js/React.js/Vue.js 等工具库的使用经验，便于理解。

<!--more-->

### 一、实现思路

要实现一个 mvvm 双向数据绑定，我们需要实现以下几点：

- 实现一个数据监听器 `Observer`，能够对数据对象的所有属性进行监听，当数据变更时能通过发布者通知所有订阅者。
- 实现一个指令和模板的解析器 `Compile`，能对各个元素节点进行扫描解析，将对应的数据模板替换成对应的数据，并且更新到视图上。
- 利用订阅者 `Watcher` 连接 `Observer` 和 `Compile`，使得监听数据变更时，视图能变化。视图绑定数据变化时，数据对象也能进行相应的变化。
- 提供一个 MVVM 函数，支持以上三个能力。

流程示意图：

![](/images/mvvm.png)


### 二、具体实现

#### 1. 实现数据监听 `Observer`

利用 `Object.defineProperty` 拦截 `data` 数据变化。

**监听者 observer.js**
```javascript
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        for (let key in data) {
            this.defineReactive(data, key, data[key]);
            // 深度递归
            this.observer(data[key]);
        }
    }
    /**
     * 定义响应式操作，此处的 value 不可省略，否则直接 get data[key] 会陷入死循环
     * @param  {Object} data 需要进行数据劫持的对象
     * @param  {String} key  需要进行数据劫持的属性
     */
    defineReactive(data, key, value) {
        // 订阅所有变更
        const dep = new Dependence();
        Object.defineProperty(data, key, {
            // 可删除
            configurable: true,
            // 可枚举
            enumerable: true,
            set: (newVal) => {
                if (newVal !== value) {
                    this.observer(newVal);// 避免新值变更为 object 后没有监听
                    value = newVal;
                    // 通知所有订阅者
                    dep.notify();
                }
            },
        });
    }
}
```

**发布者 dependence.js**
```javascript
class Dependence {
    constructor() {
        // 订阅者列表
        this.subs = new Set();
    }
    addSub(sub) {
        this.subs.add(sub);
    }
    removeSub(sub) {
        this.subs.delete(sub);
    }
    // 通知所有订阅者
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
```

每当 `data` 数据发生变更时，`setter` 拦截器都会通知发布者，从而通知所有相关的订阅者。


#### 2. 实现DOM编译 `Compile`

`Compile` 主要负责模板的解析和初始化页面视图。

由于在解析过程涉及到多次dom元素的操作，为了避免引起页面的多次回流，我们可以利用 `fragment` 文档片段进行处理，处理结束后再将 `fragment` 插入原来的节点中。

**编译者 compiler.js**
```javascript
class Compile {
    constructor(el, vm) {
        this.el = this.getElementNode(el);
        this.vm = vm;
        if (!this.el) {
            return;
        }
        this.render();
    }
    /**
     * ------------------------------------------------------------------------------------------
     * core方法
     * ------------------------------------------------------------------------------------------
     */
    render() {
        // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
        const fragment = this.node2fragment(this.el);
        // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
        this.compile(fragment);
        // 3、把编译好的 fragment 再塞回页面中
        this.el.appendChild(fragment);
    }
    node2fragment(el) {
        // 创建文档碎片
        const fragment = document.createDocumentFragment();
        // 第一个子节点
        let firstChild;

        // 循环取出根节点中的节点并放入文档碎片中，此时该节点脱离DOM树
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    // 解析文档碎片
    compile(fragment) {
        // 获取当前节点的所有子节点，包括文本节点
        const childNodes = Array.from(fragment.childNodes);

        childNodes.forEach(node => {
            if (this.isElementNode(node)) {
                this.compile(node);
                this.compileElement(node);
            } else {
                this.compileText(node);
            }
        });
    }
    compileElement(node) {
        // 获取当前节点的属性
        const attrs = Array.from(node.attributes);

        attrs.forEach(attr => {
            // 判断该元素属性是否为指令
            if (this.isDirective(attr.name)) {
                // 获取指令对应表达式
                let exp = attr.value;
                let [, type] = attr.name.split('-');
                type = `${type}Handle`;
                this[type] && this[type](node, this.vm, exp);
            }
        });
    }
    compileText(node) {
        let exp = node.textContent;
        let reg = /\{\{([^}]+)\}\}/g;
        // 将文本的编译视作默认指令 v-text
        if (reg.test(exp)) {
            this.textHandle(node, this.vm, exp);
        }
    }
    /**
     * ------------------------------------------------------------------------------------------
     * 辅助方法
     * ------------------------------------------------------------------------------------------
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    getElementNode(el) {
        return this.isElementNode(el) ?
            el :
            document.querySelector(el);
    }
    // 判断属性是否为指令
    isDirective(name) {
        return name.includes('v-');
    }
    /**
     * ------------------------------------------------------------------------------------------
     * 指令处理
     * ------------------------------------------------------------------------------------------
     */
    modelHandle(node, vm, exp) { // 输入框处理
        const updateFn = (node, value) => {
            node.value = value;
        };
        // 这里应该加一个监控，数据变化了应该调用这个watch的callbak
        new Watcher(vm, exp, (newVal, oldVal) => {
            // 当值变化后会调用callback将新值传递过来()
            updateFn(node, utils.getVal(vm, exp));
        });
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            utils.setVal(vm, exp, newValue);
        });
        updateFn(node, utils.getVal(vm, exp));
    }
    textHandle(node, vm, exp) {
        let updateFn = (node, value) => {
            node.textContent = value;
        };
        let value = utils.getTextVal(vm, exp);

        exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
            new Watcher(vm, arg[1], (newVal, oldVal) => {
                // 如果数据变化了，文本节点需要重新获取依赖的数据，更新文本中的内容
                updateFn(node, utils.getTextVal(vm, exp));
            });
        })
        updateFn(node, value)
    }
}
```


#### 3. 实现依赖收集 `Watcher`

> **依赖收集：**
>
> 新增订阅者时，将当前订阅者赋值给一个全局变量，之后触发相关联的数据的 `getter`，`getter` 就能将全局变量中包含的订阅者添加到相关的订阅者列表中。

> **连接 `Observer` 和 `Compile`：**
>
> 当 `Compile` 解析指令或数据模板时，发现有效指令或数据模板时，可新增一个订阅者相应的变化，并在回调中做出对应的处理。

**订阅者 watcher.js**

```javascript
class Watcher {
	constructor(vm, exp, callback) {
		this.vm = vm;
		this.exp = exp;
		// 存储生成编译结果的函数
		this.callback = callback;
		// 存储当前编译结果
		this.value = this.get();
	}
	get() {
		// 通过触发该数据的getter函数，将watch添加到dep中
		Dependence.target = this;
		const value = utils.getVal(this.vm, this.exp);
		Dependence.target = null;
		return value;
	}
	update() {
		const newVal = this.get();
		const oldVal = this.value;
		if (oldVal !== newVal) {
			this.value = newVal;
			this.callback && this.callback(newVal, oldVal)
		}
	}
}
```

**observer.js 新增**

```javascript
class Observer {
    // ...
    defineReactive(data, key, value) {
        // 订阅所有变更
        const dep = new Dependence();
        Object.defineProperty(data, key, {
            // ...
            get: () => {
                // 利用全局变量新增相关订阅者
            	Dependence.target && dep.addSub(Dependence.target);
                return value;
            }
        });
    }
}
```


#### 4. 提供入口构造函数 `MVVM`

mvvm.js
```javascript
class MVVM {
    constructor(options) {
        this.$data = options.data();
        // 数据劫持
        new Observer(this.$data);
        // 数据代理
        this.proxyData(this.$data);
        // 元素存在，则进行挂载
        if (options.el) {
            this.mount(options.el);
        }
    }
    /**
     * 数据代理，方便调用
     * 可通过修改 vm.test 间接修改 vm.$data.test 的值
     * @param  {Object} data vm.$data
     */
    proxyData(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue;
                }
            })
        }
    }
    /**
     * 元素挂载，进行初始化
     * @param  {[type]} el [description]
     */
    mount(el) {
        new Compile(el, this);
    }
}
```

### 三、补充

相关源码地址：[请访问](https://github.com/yiqingfeng/blog-code)

#### 参考阅读

- https://github.com/DMQ/mvvm