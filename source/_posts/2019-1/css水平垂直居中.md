---
title: css水平垂直居中
categories: 每日一题
date: 2019-04-11 11:40:03
tags: [css, css居中布局]
---

> 如何让一个div元素在它的父容器中垂直水平居中呢？

- {% post_link 2019-1/css水平居中 %}
- {% post_link 2019-1/css垂直居中 %}

<!--more-->

### 一、实现方式

```html
<div class="parent">
    <div class="child">DOME</div>
</div>
```

#### 1. 行内元素特性 `table-cell + vertical-align + inline-block + text-align`

```css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

#### 2. 绝对定位 `absolute + transform`

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
}
```

#### 3. flex布局 `flex + justify-content + align-items`

```css
.parent {
    position: flex;
    justify-content: center;
    align-items: center;
}
```

#### 3. grid布局 `grid + justify-self + align-self`

```css
.parent {
    position: grid;
}
.child {
    justify-self: center;
    align-self: center;
}
```

### 二、补充说明

以上均是考虑到页面内容不定宽高的情况。事实上如果父元素和子元素宽高度确定，也可以直接用`padding`、`magin`计算的方式使其垂直居中。

[实例页面](/examples/css/水平垂直居中.html)

> 注意 `disply: table-cell;` 的元素，不支持设置 `width: 100%;`; 如果想实现 `width: 100%;` 的效果最好给其设置一个 `disply: table;` 的元素。