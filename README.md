## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## next学习
 1.  server component：是在服务端渲染，client component是在客户端渲染。所有初次进入的页面都是server component。服务端组件是使用async await创建。所以获取数据也不需要useEffect，直接在组件中使用await获取数据即可。
 2.  server action：form action提交的action也是server渲染，所以也use server
 3.  client component是在客户端渲染，交互又不刷新的都使用client component。（也不需要seo，不需要源码中渲染出来）比如表单的错误显示，搜索，分页，快捷编辑等。客户端组件获取数据需要使用userEffect。且不需要是async创建的。
 4.  Streaming或者叫异步组件，使用Suspense延迟渲染，并且使用骨架组件填充
 5.  数据获取时的预编译：getStaticProps。不需要在请求时，再在服务端获取数据并且编译，节约时间。让网站变成静态的。（比如发表的文章。固定的数据等）
 6.  getServerSideProps 其实现在用不到了。直接使用服务端组件就行了。

## 登陆
1. 登陆画面：判断session，如果已经登陆，跳转到主页，如果未登陆，显示登陆画面。
2. 保护画面：判断session，如果已经登陆，显示保护画面，如果未登陆，跳转到登陆画面。

## 认证鉴权的判断
通过中间件判断访问来源：
1. 如果是api请求，使用jwt认证
2. 如果是页面请求，使用session认证

## 注意
文件名如果错误，会导致页面无法访问，比如middleware.ts后面多了一个空格，会导致中间件失效。坑了几天。。