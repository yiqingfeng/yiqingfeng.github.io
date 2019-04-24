---
title: token原理
categories: 每日一题
date: 2019-04-24 16:49:41
tags: 原理
description:  token 加密的原理是什么样的呢？
---

### 一、token

#### 举个栗子：
如何在客户端与服务器断开连接后，客户端不直接存储用户的账号和密码的情况下，实现自动登录，即避免用户多次输入登录。（持久化登录）

#### token机制：
1. 客户端通过，账户和密码请求登录。
2. 服务器收到请求，验证账户密码。验证成功后，签发一个字符串`token`（包含部分用户信息和过期时间）给客户端。
3. 客户端请求时，带上`token`。
4. 服务器收到请求后，验证`token`，通过则返回对应数据，否则给出错误信息。

**用户匹配**：在实际使用中通过添加用户的少量信息，如 `useId`，就能将 `token` 与用户进行关联。 

#### token校验：

`token`虽然可以持久化登录，但是服务器又该怎么确保`token`的正确性呢？（防止伪造）

- **防伪造**：服务器利用私钥对一些不敏感的信息加密生成签名，将签名和数据拼接作为token的一部分。例如 JWT，参考[JSON Web Token - 在Web应用间安全地传递信息](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)。
- **干扰码**：服务器生成 `token` 时，可以使用客户端的UA作为干扰码对数据加密。客户端请求时，服务器可以使用UA对`token`解密。
- **有效期**：通过加入有效期，使得 `token` 仅在一段时间内有效，这样能尽量减少损失。

#### token刷新：

**`token` 过期机制：**
- 服务器缓存`token`及对应的过期时间，需要服务器更新过期时间，`token`就会再次有效。
- `token`中包含有过期时间。需要重新生成 `token`。

当 `token` 过期了，如果客户端希望刷新 `token` 的话，需要重新引入数据来验证。一种是让用户重新输入账号密码。另一种方式就是使用摘要。即在生成 `token` 的同时，生成 `token` 的摘要，一起返回给客户端，类似于微信登录的 refresh_token。

### 二、相关讨论：

- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/106

### 三、相关阅读：

- [关于token、签名、加密的一点理解](https://blog.csdn.net/maocai008/article/details/79064542)
- [Token - 服务端身份验证的流行方案](https://www.jianshu.com/p/e0ac7c3067eb)
- [基于 Token 的身份验证：JSON Web Token](https://ninghao.net/blog/2834)
