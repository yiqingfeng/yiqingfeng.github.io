---
title: css水平居中
categories: 每日一题
date: 2019-04-11 11:18:34
tags: [css, css居中布局]
---

<div style="width: 300px; background-color: #ccc; display: flex;"><div style="background-color: #000; color: #fff;margin: 0 auto;">DOME</div></div>

在 CSS 中，如何让一个元素水平居中，即如何实现水平居中布局？长话短说，让我们一起来看下吧。

<!--more-->

### 一、实现方式

```html
<div class="parent">
    <div class="child">DOME</div>
</div>
```

#### 1. 行内元素特性 `inline-block + text-align`

```css
.parent {
    text-align: center;
}
.child {
    display: inline-block;
    text-align: center;
}
```

#### 2. 块级表格  `table + margin`

```css
.child {
    display: table;
    margin: 0 auto;
}
```

#### 3. 绝对定位  `absolute + transform`

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 相对自身 */
}
```

#### 3. flex

##### 1. `flex + justify-content`

```css
.parent {
    display: flex;
    justify-content: center;
}
```

##### 2. `flex + margin`

```css
.parent {
    display: flex;
}
.child {
    margin: 0 auto;
}
```

#### 4. gird

##### 1. `gird + justify-content`

```css
.parent {
    display: gird;
    justify-self: center;
}
```

##### 2. `gird + margin`

```css
.parent {
    display: gird;
}
.child {
    margin: 0 auto;
}
```

### 二、补充说明

以上均是考虑到页面内容不定宽的情况。事实上如果元素的子元素宽度确定，可以直接用`margin: 0 auto;`使其水平居中。

[实例页面](/examples/css/水平居中.html)
