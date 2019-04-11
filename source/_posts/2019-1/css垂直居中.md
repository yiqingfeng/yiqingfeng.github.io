---
title: css垂直居中
categories: 每日一题
date: 2019-04-11 11:39:52
tags: [css, css居中布局]
---

在前一篇 {% post_link 2019-1/css水平居中 %} 中，我们了解到了 CSS 水平布局的几种方式。那么如果一个元素需要垂直居中，那么又该怎么利用 CSS 实现呢？

<!--more-->

### 一、实现方式

```html
<div class="parent">
    <div class="child">DOME</div>
</div>
```

#### 1. table表格 `table-cell + vertical-aligin`

```css
.parent {
    display: table-cell;
    vertical-align: middle;
}
```

#### 2. 绝对定位 `absolute + transform`

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translatY(-50%);    
}
```

#### 3. flex布局 `flex + align-items`

```css
.parent {
    display: flex;
    align-items: middle;
}
```

#### 4. grid表格 `grid + align-self`

```css
.parent {
    display: grid;
}
.child {
    align-self: center;
}
```

### 二、补充说明

以上均是考虑到页面内容不定高的情况。事实上如果子元素宽度确定，也可以直接用`padding`、`magin`计算的方式使其垂直居中。

[实例页面](/examples/css/垂直居中.html)