## hexo 构建github个人博客网站的坑

1. 页面404
问题原因：发布内容有问题
解决方案：发布内容为编译内容

2. 主题处理
使用者可以`git clone`指定的主题到`/themes`下，同时配置根目录下的`_config.yml`文件，即可使用该主题。同时每个主题都有自己对应的配置，用户可以到主题文件夹下更改相应的配置。

> hexo themes:
> [hexo themes](https://githueb.com/hexojs/hexo/wiki/Themes)
> [有哪些好看的 Hexo 主题？](https://www.zhihu.com/question/24422335)
> [next](http://theme-next.iissnan.com/)

3. 使用方式
[GitHub+Hexo 搭建个人网站详细教程](https://zhuanlan.zhihu.com/p/26625249)

https://hexo.io/zh-cn/docs/setup.html

##### 现在来介绍常用的Hexo 命令

npm install hexo -g #安装Hexo
npm update hexo -g #升级 
hexo init #初始化博客
`hexo new [layout] <title>` 新建

命令简写
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo g == hexo generate #生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy #部署

hexo server #Hexo会监视文件变动并自动更新，无须重启服务器
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存，若是网页正常情况下可以忽略这条命令

刚刚的三个命令依次是新建一篇博客文章、生成网页、在本地预览的操作

#### hexo拓展

- [hexo的next主题个性化教程:打造炫酷网站](https://www.jianshu.com/p/f054333ac9e6)

在 `source/_posts` 目录下的文件夹里创建文档

`npm run new tit=<tit> [lay=<lay>] [out=<out>]`

例如创建一个日常笔记 `npm run new lay=fe-daily out=fe-daily tit=今日一题`