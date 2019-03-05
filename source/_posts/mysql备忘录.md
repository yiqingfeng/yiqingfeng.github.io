---
title: mysql备忘录
date: 2018-02-12 18:56:04
tags: mysql
categories: 文档备忘录
---

### MYSQL常用命令

1、 数据库

- `show datatables` 显示所有数据库。
- `create databse <数据库名>` 创建数据库。
- `drop databse <数据库名>` 删除制定数据。
- `use <数据库名>` 连接某数据库。

2、 数据表

- `create table <表名> ( <字段名1> <类型1> [,..<字段名n> <类型n>])` 创建数据表。
``` mysql
create table MyClass(
id int(4) not null primary key auto_increment,
name char(20) not null,
sex int(4) not null default '0',
degree double(16,2));
```
- `rename table 原表名 to 新表名;` 更新数据表名称。
- `drop table <表名>` 删除数据表，并取消其关联。
- `insert into <表名> [( <字段名1>[,..<字段名n > ])] values ( 值1 )[, ( 值n )]`  向指定数据表插入数据。
- `select <字段1，字段2，...> from < 表名 > where < 表达式 > order by <字段> limit 0,2;` 选择指定的数据。
- `delete from 表名 where 表达式` 删除指定数据。
- `update 表名 set 字段=新值,… where 条件` 更新指定的数据。
- `alter table 表名 add字段 类型 其他;` 可利用该命令进行字段处理。

3、数据备份

- 

### 字符编码

- `utf_bin` 中，`bin`指的是二进制。而`utf_general_ci`中`ci`是 case insensitive，即大小写不敏感的意思。
- `utf8_unicode_ci` 和 `utf8_general_ci` 对中、英文来说没有实质的差别。`utf8_general_ci` 校对速度快，但准确度稍差。`utf8_unicode_ci` 准确度高，但校对速度稍慢。如果你的应用有德语、法语或者俄语，请一定使用`utf8_unicode_ci` 。一般用 `utf8_general_ci` 就够了，到现在也没发现问题。