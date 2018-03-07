# react-lazyimg-component

**react-lazyimg-component** 一个基于[jquery.lazyload](https://github.com/tuupola/jquery_lazyload)，结合react组件概念完成的图片懒加载小插件。支持全局配置，config 配置，个性定制等特性，还支持 [velocity.js](https://github.com/julianshapiro/velocity)、[animate.css](https://github.com/daneden/animate.css)动画库配置。用法上做到了尽量与jquery.lazyload保持一致，如果你之前用过jquery.lazyload完全无学习成本过渡，直接上手~~~~~

## :bell: DEMOS展示入口

[:point_right: 猛击这里吧 :soon:](http://zhansingsong.github.io/lazyimg/)

## 特性

* 小巧轻便，简单易用，基本无学习成本
* 支持 [velocity.js](https://github.com/julianshapiro/velocity)、[animate.css](https://github.com/daneden/animate.css) 动画效果库，及自定动画效果
* 支持 react 组件式 placeholder
* 支持全局配置，分组配置及个性定制
* 支持动画效果作用于父级元素
* 支持响应式图片( picture / srcset )



## 安装

```bash
// npm
$> npm install react-lazyimg-component
// yarn
$> yarn add react-lazyimg-component
```

## 使用

### 默认配置：

```js
// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 调用
<Lazyimg
  className="lazy"
  src={
    'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'
  }
/>;
```

### config 配置：

```js
// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 引入 volecity.js
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
// 配置
const config = {
  threshold: 100, // 指定触发阈值
  js_effect: 'transition.fadeIn', // 支持 velocity.js 动画效果
};
const Lazy = withLazyimg(config);
// 调用
<Lazy
  className="lazy"
  src={
    'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'
  }
/>;
```

### 个性定制

```js
// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 调用
<Lazyimg
  className="lazy"
  threshold={100} // 指定触发阈值
  js_effect="transition.fadeIn" // 支持 velocity.js 动画效果
  src={
    'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'
  }
/>;
```

> 优先级： 个性定制 > config 配置 > 默认配置


## API

通过配置项来决定懒加载的行为，to use is super easy😎。API 也极其简单。

* Lazyimg：默认配置
* withLazyimg(config)：可定制

### config 配置项

看看有哪些可配置项：

```js
threshold: 0, // 指定距离底部多少距离时触发加载
event: 'scroll', // 指定触发事件，默认为'scroll'
js_effect: undefined, // 显示图片的js动画效果
css_effect: undefined, // 显示图片的css动画效果
container: window, // 指定容器，默认为window
parent: undefined, // 可以指定动画效果作用于元素的哪个父级元素
appear: null, // 元素出现在可视窗口时触发appear钩子函数
load: null,  // 元素图片的加载完后触发load钩子函数
error: null, // 图片加载出错时触发error钩子函数
node_type: 'img', // 指定生成的节点类型，默认为'img'
placeholder: // 占位元素，除了支持普通的图片外，还支持react组件。
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
```

是不是很眼熟 😄，如果你熟悉 jquery.lazyload，那么你只需了解如下几个配置项即可：

* js_effect: 指定元素显示的动画效果，基于`velocity.js`动画实现。使用之前需加载`velocity.js`。
* css_effect: 指定元素显示的动画效果，基于`animate.css`动画实现。使用之前需安装`animate.css`。
* parent: 用于指定动画效果作用于元素的哪个父级元素。可取值：

  * 父元素的 selector 选择器（字符串）
  * 父级层级 level（整数）

* node_type: 指定 react 将生成的元素类型，默认为'img'。
* placeholder: 占位元素，除了支持普通的图片外，还支持 react 组件。

## 案例

* 搜狗漫画：[http://mh.sogou.com/](http://mh.sogou.com/)
* 搜狗优惠券：[http://mai.sogou.com/tejia/m/coupons/#/0](http://mai.sogou.com/tejia/m/coupons/#/0)

## TODO

* [x] 支持动画库的配置
* [x] 增加 demos 展示页面
* [ ] 支持 IntersectionObserver 检查 visibility，优化检测元素可见性的机制。
* [x] 增加 test 用例
* [x] 发布到 npm 和 yarn
