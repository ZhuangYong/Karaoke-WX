#前言
ReactJS（https://reactjs.net/）是由顶尖的IT公司Facebook和Instagram协同开发者社区维护的一个开源JavaScript库。这个框架现在被广泛地应用于开发Web应用程序的用户界面。最初开发这个特别框架的目标是“搭建数据需要频繁更改的大型应用程序”。这样的工具有很多都是我们经常使用的，但其中只有极少数最终彻底改变了我们的工作方式，ReactJS就是其中之一，这就是我们为什么强烈推荐React的原因。本文将会列出许多大公司，比如Facebook、Instagram、Whatsapp使用ReactJS的5个原因。

* React效率极高
react可以创建存放组件的虚拟DOM（文档对象模型Document Object Model），这一特点为开发人员提供了高度灵活性和惊人的性能收益，因为React能够提前计算出DOM中哪些内容需要更改，并对DOM树做出相应地更新。通过这种方式，React避免了代价高昂的DOM操作，从而大幅提升了工作效率。DOM

* Javascript库
JSX是javascript和HTML的完美结合，可专门用于ReactJS，大大简化了编写网站组件的流程。JSXReact的主要优势是合理地利用了本地API达到了跨平台的效果。

* SEO友好
JavaScript框架的缺陷之一是对搜索引擎十分不友好，尽管最近已经有所改进。但是，React.js在这方面却做的很出色。你可以在服务器端运行React.js，虚拟DOM可以像常规的web页面一样返回给浏览器，不需要任何特殊技巧。

* 注重用户界面
与MeteorJS、Firebase、AngularJS不同的是，React Native十分重视用户界面。通过设备本地环境与react native的Javascript交互，可以给用户提供完美的响应式界面。虽然这一定程度上增加了应用的加载时间，但也保证了程序运行过程中的流畅。

* 简单，使用便捷
如果准备开发React项目，别忘了安装ReactJS的官方Chrome插件，它能使你的调试过程变得更加简单。安装完插件之后，你就可以像在元素面板中浏览一个常规DOM树一样直接查看虚拟DOM。

## 技术栈

react + redux + react-router + webpack + ES6/7 + fetch + sass 


# 项目说明
## 项目结构

```
.
├─.editorconfig                       // 规范代码编写风格，IDE用
├─.gitattributes                      // 用于设置文件的对比方式（常用非文本文件）
├─.gitignore                          // git忽略上传的文件
├─package.json                        // npm命令包
├─readme.md                           // 项目介绍
├─test
|  ├─config                           // 测试配置文件夹
|  └ui                                // 测试源码文件夹
├─testapi                             // 项目接口测试文件夹
|      ├─api                          // 接口数据文件夹
|      └assets                        // 测试资源文件夹
├─tools                               // 开发辅助工具文件夹
|    └lib                             // 辅助工具文件夹 
├─src                                 // 页面主文件
|  ├─config
|  ├─browserconfig.xml                // 解决网站部分用户访问browserconfig.xml文件返回404的问题
|  ├─crossdomain.xml                  // 跨域策略文件
|  ├─robots.txt                       // 也称为爬虫协议、机器人协议
|  ├─favicon.ico                      // 可以让浏览器的收藏夹中除显示相应的标题外，还以图标的方式区别不同的网站
|  ├─tile.png                         // 
|  ├─tile-wide.png                    // 
|  ├─apple-touch-icon.png             // 类似网站favicon的图标文件，用来在iphone和ipod上创建快捷键时使用
|  ├─css                              // 样式文件夹
|  |   ├─common                       // 公共样式文件夹
|  |   ├─home                         // 首页样式文件夹（样例）
|  |   └main.css                      // 
|  ├─sass                             // 
|  |   ├─audio                        // 音频播放样式
|  |   └login                         // 登录样式
|  ├─img                              // 图片资源文件夹
|  |   └**.png
|  ├─js                               // 项目主文件夹
|  |   ├─action                       // 项目actions
|  |   ├─components                   // 项目组件文件夹
|  |   ├─containers                   // 项目页面文件夹
|  |   ├─lib                          // 库类文件夹
|  |   ├─reducers                     // redux reducers
|  |   ├─utils                        // 工具类
|  |   └index.js                      // 项目入口、启动js



```
 ##目录
[**src**](#src) ：项目源码路径
    * `config` 项目配置文件目录：webpack、eslint 配置路径
    * `css` css样式文件
    * `doc` 项目文档存放路径
    * `img` 项目图片存放路径
    * `js` js文件存放路径
    * `sass` sass文件夹存放路径

[**archive** ](#archive) ：项目编译后打包存放的路径

[**build**](#build) ：开发调试编译临时文件存放的路径

[**dist**](#dist) ：正式编译临时文件存放路径

[**node_modules**](#node_modules) ：lib 包存放路径

[**test**](#test) ：单元测试源码路径

[**testapi**](#testapi) ：测试接口、资源路径

[**tools**](#tools) ：开发辅助工具存放路径

## 开发启动

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
npm install  (安装依赖包)

npm run dev (运行本地开发环境)

npm run build (打包)

```

   








