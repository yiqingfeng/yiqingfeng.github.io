---
title: IE CSS hack
date: 2018-04-09 23:16:12
tags: CSS
---

## 针对IE的css hack

```css

	.all IE{property:value\9;}
	.gte IE 8{property:value\0;}
	.lte IE 7{*property:value;}
	.IE 8/9{property:value\0;}
	.IE 9{property:value\9\0;}
	.IE 7{+property:value;}
	.IE 6{_property:value;}
	.not IE{property//:value;}

```

- `lte`：就是Less than or equal to的简写，也就是小于或等于的意思。
- `lt` ：就是Less than的简写，也就是小于的意思。
- `gte`：就是Greater than or equal to的简写，也就是大于或等于的意思。
- `gt` ：就是Greater than的简写，也就是大于的意思。
- `!`  ：就是不等于的意思，跟javascript里的不等于判断符相同

``` css
	/* ie浏览器hack */
	.demo {
        padding:10px;
        padding:9px\9; /* all ie */
        padding:8px\0; /* ie8-9 目前应用于IE8的单独hack，情况比较少 */
        *padding:5px; /* ie6-7 */
        +padding:7px; /* ie7 */
        _padding:6px; /* ie6 */
	}
```

PS: 这是所有ie的hack了，360用的ie内核，跟你自己本机的ie有关系