---
title: Vuex 状态管理
tags: VUE
categories: 前端开发框架+库
---

## 前言

在前端组件化开发中，一般情况下都是采用单向数据流的方式。即 state -> view -> action -> state。这种方式在多视图情况下，
常会涉及多组件之间通信（数据共享）。

## 参考资料

- [Vuex 手册](https://vuex.vuejs.org/zh-cn/mutations.html)

## 相关概念

### state (单一状态树)

即利用一个对象包含全部应用的数据源。

##### 结合vue：
- 在vue中，可以利用计算属性来返回某个状态。这样每当状态发生变动时，都会重新计算。不过这种方式会导致组件依赖全局状态单例，同时每个需要state的组件都需频繁导入。
- 利用 vuex 将 store 从根组件“注入”到每一个子组件中。这样子组件就能通过 `this.$store`访问。

```
Vue.use(Vuex);

new Vue({
    el: '#app',
    store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    components,
    ...
});

```

> **tips:**
> 单一组件涉及到多个状态，可以利用`mapState`辅助函数减少计算属性的重复和冗余。
> 不必要的局部状态最好还是作为组件的一部分。需依据开发进行权衡和确认。

### Getter （vuex的“计算属性”）

合理的利用 Vuex 的 Getter 能更加方便地访问满足条件的state，尤其是列表的 state。

> **tips:**
> 可以利用 Getter 返回一个函数实现传参。（柯里化） 
> 可以利用 mapGetters 辅助函数来对 Getter 建立一个别名。（感觉用处不是很大）

### Mutation （类似事件）

在 Vuex 中更改 state 的唯一方式就是提交 mutation。每个 mutation 都有一个字符串的**事件类型 (type)**和 一个**回调函数 (handler)**。当然不能直接调用一个 mutation handler。要唤醒一个 mutation 可以调用`store.commit(type)`。 

mutation 必须是同步函数。（同步事务）

> **tips:**
> 可以向`store.commit`传入额外的参数实现提交荷载（payload），但是大多数情况下，荷载应该是一个对象，这样既可以包含多个字段，同时也会使得 mutation 更易读。
> 对象风格的提交方式: 提交 mutation 的另一种方式是直接使用包含 type 属性的对象。即`store.commit({ type: 'increment' })`。这样整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变。
> 使用常量替代 mutation 事件类型，能在多人合作时，使得合作者对整个 app 的 mutation 一目了然。
> 在组件中提交 mutation 时，可以使用`mapMutations`辅助函数将组件中的方法`methods`映射为`store.commit`。
 
### Action (支持异步提交)

action提交的是 mutation ，并非直接变更状态。

其中 action 会接受一个与 store 实例具有相同方法和属性的 context 对象。当然 action 和 mutation 一样都不能直接操作，需要通过 `store.dispatch` 触发。

> **tips:**
> actions 支持同样的载荷方式和对象方式进行分发。
> 在组件中分发 action 时，可以使用`mapActions`辅助函数将组件中的方法`methods`映射为`store.dispatch`。
> 注意：组合 action 时，可以利用 promise、action内部调用，以及 async / await 的方式。


### Module (模块)

由于整个应用使用的是同一个状态树，当应用过于复杂时，store 对象就会相当臃肿。 vuex中提供 module 将 store 进行分割，每个 module 都拥有自己的 state、getter、mutation、action，甚至是嵌套子模块。

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。同样对于模块内部的 action，局部状态通过`context.state`暴露出来，根节点状态则为`context.rootState`。

> **命名空间：**
> 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
> 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

模块可以进行动态创建。例如 vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。