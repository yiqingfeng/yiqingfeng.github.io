---
title: css图片布局
date: 2018-05-17 17:29:29
tags: CSS
categories: WEB前端基础
---

## 前言

在前端开发过程中，经常会涉及到图片相关布局。尤其是涉及到图片宽度自适应时，这时候就需要将容器宽高按照一定比例进行设置。

## 解决思路

- 利用`padding`实现容器宽高比

> **padding**:
> 在默认的水平文档流方向下，CSS margin和padding属性的垂直方向的百分比值都是相对于宽度计算的，这个和top, bottom等属性的百分比值不一样。

```html
<div class="demo-bg">	
</div>

<div class="demo-img">
    <img src="./test.jpg" alt="">
</div>
```

```css
.demo-bg {
    padding: 50% 50% 0;
    background: url("./test.jpg") no-repeat;
    background-size: cover;
}
.demo-img {
    position: relative;
    padding: 50% 50% 0;
}
.demo-img img {
    position: absolute;;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

## 参考资料

- [CSS百分比padding实现比例固定图片自适应布局](http://www.zhangxinxu.com/wordpress/2017/08/css-percent-padding-image-layout/)