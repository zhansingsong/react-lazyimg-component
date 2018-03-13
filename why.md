# 为什么我要写这个 react 插件

图片懒加载是项目中常用的功能，然而现有 react 懒加载组件库，用着都不是很爽了 😝。概括一下有如下几点：

* 没有只针对 image 懒加载组件。多数组件库都内置了模块、组件、脚本、iframe 懒加载功能，而弱化了 image 懒加载功能。
* 不支持动画显示效果。
* 不灵活，可配置度不高。
* placeholder 不能组件化。
* 不支持响应式图片( picture / srcset )。

## [react-lazyimg-component](https://github.com/zhansingsong/react-lazyimg-component)

清楚自己想要什么样的组件，就自己动手撸呗 😎。于是乎，[react-lazyimg-component](https://github.com/zhansingsong/react-lazyimg-component) 就诞生了 😆。咱们先来看看它的效果吧：

> singsong: 如果大家有时间，窝还是鼓励大家自己动手实现一些小插件。

* PC 预览：

[使劲猛击这里](http://zhansingsong.github.io/lazyimg/)

* 手机预览(扫一扫)：

![qrcode](https://github.com/zhansingsong/react-lazyimg-component/raw/master/qrcode.png)

## 什么情况需要使用它

### 1. 小巧轻便，简单易用，基本无学习成本

![jq](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/jq.png)

在那个 jQuery 一统天下的年代，撸代码就用 jQuery 一把梭。其中
jQuery.lazyload 是一个很常用图片懒加载插件。 可能很多像我一样的小伙伴们，懒加载就直接上 jQuery.lazyload，早已习惯了 jQuery.lazyload 使用。 于是自己就琢磨能否继承 jQuery.lazyload 使用方法同时保持 react 特有组件特性。这样可以很快上手~~~~~😝

> singsong: 这里只是继承了 jQuery.lazyload 配置特性，不是完全继承。毕竟 jQuery 与现在主流的 MVVM 框架思想截然不同。

如果小伙伴们熟悉 jQuery.lazyload ， 完全没有学习成本直接上手 **react-lazyimg-component** 哈。 只说不是写，然并卵。那我们来看看它到底好用不：

#### 安装

```js
// npm
$> npm install react-lazyimg-component
// yarn
$> yarn add react-lazyimg-component
```

#### 使用

```js
// 引入
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';

// 调用
<Lazyimg
  className="lazy"
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;
```

是不是很简单，有木有 😝。上述只是使用 **react-lazyimg-component** 的默认配置。 这里我们可以通过配置项来定制懒加载的行为：

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
// 基于配置项生成对应 Lazy 组件
const Lazy = withLazyimg(config);

// 调用
<Lazy
  className="lazy"
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;
```

接下来我们来看看 **react-lazyimg-component** 都那些配置项：

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

### 2. 支持 [velocity.js](https://github.com/julianshapiro/velocity)、[animate.css](https://github.com/daneden/animate.css) 动画效果库，及自定动画效果。同时还支持动画效果作用于父级元素。

* 指定 **js-effect** 配置项来配置 **velocity.js** 动画效果

> 注意：js-effect 依赖于 velocity.js。需要确保 velocity.js 已加载。

```js
// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 引入 volecity.js
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
// 配置
const config = {
  placeholder: 'loading.svg',
  js_effect: 'transition.fadeIn', // 支持 velocity.js 动画效果
};
const Lazy = withLazyimg(config);
// 调用
<Lazy
  className="lazy"
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/js-effect.gif)

* 指定 **css-effect** 配置项来配置 **animate.css** 动画效果

> 注意：css-effect 依赖于 animate.css。需要确保 animate.css 已安装。

```js
  // 配置
  const config = {
    js_effect="transition.flipXIn" // 不会生效
    css_effect={['animated', 'rollIn']} // 定制 css 动画效果
  };
  const Lazy = withLazyimg(config);
  // 调用
  <Lazy
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />;
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/css-effect.gif)

* 指定 **parent** 配置项指定父级元素动画效果

> singsong: 为什么懒加载的动画效果只作用于目标元素，某些条件下作用于目标元素的父级元素会有意想不到效果哦 😝。

```js
<div className="example">
  // 指定动画效果作用于该父级元素
  <Title title="父级动画效果" className="sub" />
  <div className="example-img">
    <Lazyimg
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
      css_effect={['animated', 'flipInY']} // 定制 css 动画效果
      parent=".example" // 指定父级元素选择器，也可以指定父级层级level：2
    />
  </div>
</div>
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/parent.gif)

### 3. react 组件式 placeholder

> singsong: 传统的 placeholder 通常都是由图片来代替，为什么不能用组件来定制，这样可扩展性更高。完全可以摆脱设计师的束缚，咋们开发自由发挥😯! 想想有木有有点小鸡冻 😝~~~~~~

* 先定义 placeholder 组件

```js
import React from 'react';
import './style.scss';
export default props => {
  let { className, text, img, children } = props;
  return (
    <div
      className={['placeholder', className]
        .filter(item => {
          if (item) {
            return item;
          }
        })
        .join(' ')}
    >
      {img && <img src={img} className="placeholder-img" />}
      {text && <span className="placeholder-text">{children || text}</span>}
    </div>
  );
};
```

* 指定 placeholder 配置项为上述定义的 placeholder 组件

```js
// 配置
const Lazy = withLazyimg({
  js_effect: 'transition.perspectiveDownIn',
  placeholder: <Placeholder img={require('./loading.svg')} />,
});
// 调用
<Lazy
  className="lazy"
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/placeholder.gif)

> singsong: 图中小火焰有木有很耀眼~~~~~

接着咋们来看看组件式 placeholder 应用场景案例，直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/demo.gif)

上图是分类页通过定制显示文案的 placeholder 组件来代替普通的灰色图片，效果是不是看着还行 😝。这是我在实际项目中使用的案例。这里小伙伴可以自由发挥哈~~~~~。如果你有不错 idea 可以@我哈，先谢了！

### 4. 响应式图片( picture / srcset )

为了实现 web 应用的极致体验，Progressive Web App 渐进式网页应用程序越来越受到开发者们重视，其中响应式图片就是其中一个重要技术项。为了跟着大部队，咋们也需要了解了解噢！

* srcset 特性实现响应式图片

```html
  // dpr
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    srcSet="source_1x.png 1x, source_2x.png 2x, source_3x.png 3x, source_3.5x.png 3.5x"
    js_effect="transition.bounceIn"
  />
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/srcset.gif)

> singsong: 这里 srcset 配合 sizes 特性可以实现更好的效果

* picture 元素实现响应式图片

```html
  <picture>
      <source media="(min-width: 650px)" srcSet="https://www.w3schools.com/tags/img_pink_flowers.jpg" />
      <source media="(min-width: 465px)" srcSet="https://www.w3schools.com/tags/img_white_flower.jpg"/>
      <Lazyimg
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
      js_effect="transition.expandIn"
    />
  </picture>
```

直接上效果了 😝

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/picture.gif)

## 后语

这个插件是我由项目中提炼出的，个人用着还挺顺手，就拿出与大家分享分享。另外，毕竟个人能力有限，如果你发现插件有问题或有什么好的建议，也请告知一下，先这里谢过了 😝。最后欢迎star😝、欢迎watch😝、欢迎fork😝
