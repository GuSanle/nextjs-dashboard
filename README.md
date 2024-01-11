## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## 官方文档错误
官方文档15章节，有一个错误，nextauth认证无法登陆。问题在于AUTH_URL没有设置，设置了自定义的login页面，但是没有设置AUTH_URL，导致无法登陆。 
同时缺少对登陆后session的判断，所以无论是已经登陆画面还是未登陆画面。都会有问题。

1. 登陆画面：判断session，如果已经登陆，跳转到主页，如果未登陆，显示登陆画面。
2. 保护画面：判断session，如果已经登陆，显示保护画面，如果未登陆，跳转到登陆画面。

## 认证鉴权的判断
通过中间件判断访问来源：
1. 如果是api请求，使用jwt认证
2. 如果是页面请求，使用session认证
