# react-lazyimg-component

**react-lazyimg-component v1.0.0** 是使用 [Typescript](https://www.typescriptlang.org/)、[React Hooks](https://zh-hans.reactjs.org/docs/hooks-reference.html)、[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)完全重构的，React 图片懒加载小组件。并且组件参考了[React Transition Group 的 SwitchTransition](https://reactcommunity.org//switch-transition) 动画实现原理 ，引入全新的渐进性自然过渡效果（如下图 **方案 B** 所示）。

![](./lazyimg.png)

**Demo 效果**

![](./lazyimg.gif)

### PC 预览：

[:point_right: 猛击这里吧 :soon:](http://zhansingsong.github.io/lazyimg/)

### 手机预览(扫一扫)：

![qrcode](./qrcode.png)

## 特性

- Typescript 静态类型检查，友好的代码提示与补全
- React Hooks 实现
- Intersection Observer API 取代 scroll 事件，代码更加简洁，性能更好。并且做了兼容处理
- 兼容服务端渲染
- 定制默认 `props`
- 默认开启全新的渐进性自然过渡效果
- 小巧轻便，简单易用，基本无学习成本
- 支持 react 组件式 placeholder
- 支持动画效果作用于父级元素
- 支持响应式图片( picture / srcset )

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
import Lazyimg, {LazyimgWrapper} from 'react-lazyimg-component';
// 调用
<LazyimgWrapper>
  <Lazyimg className="lazy" src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'} />
</LazyimgWrapper>;
```

### config 配置：

```js
// 引入 lazyimg
import Lazyimg, {withLazyimg} from 'react-lazyimg-component';
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
<Lazy className="lazy" src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'} />;
```

### 个性定制

```js
// 引入 lazyimg
import Lazyimg, {withLazyimg} from 'react-lazyimg-component';
// 调用
<Lazyimg
  className="lazy"
  threshold={100} // 指定触发阈值
  js_effect="transition.fadeIn" // 支持 velocity.js 动画效果
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;
```

## API

通过 `props` 来决定懒加载的行为，to use is super easy😎。

- **Lazyimg：默认组件**

  ```js
  // 图片地址
  src: string;
  // 响应式【可选】
  srcSet: string;
  // 指定元素的 node Type，默认为 `img`【可选】
  element?: string;
  // 为 `true` 时，直接替换 src，不使用懒加载行为。默认为 'false'【可选】
  force?: boolean;
  // 在图片加载好替换前 hook 回调 【可选】
  loaded?: (el?: HTMLElement) => void;
  // 动画执行完完 hook 回调【可选】
  end?: (el?: HTMLElement) => void;
  // 过渡动画类型【可选】
  animateType?: 'none' | 'transition' | 'animation';
  // 动画作用类名【可选】
  animateClassName?: string[];
  // 动画执行时长，用于动画事件的不兼容时回退处理【可选】
  timeout?: number;
  // 动画作用于父级元素【可选】
  parent?: number | string;
  // 指定图片加载前，显示内容【可选】
  placeholder?: React.ReactNode;
  // Intersection observer options：https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API 【可选】
  root?: Element;
  rootMargin?: string;
  threshold?: number[];
  ```

  - src：图片地址
  - srcSet：响应式图片地址
  - force：为 `true` 时，直接替换 src，不使用懒加载行为。默认为 `false`。
  - loaded：在图片加载好替换前 hook 回调。回调参数为当前元素 `el`。
  - end：动画执行完完 hook 回调。回调参数为当前元素 `el`。
  - animateType：动画类型。可取值：

    - `'animation'`：使用 `animation` 动画
    - `'transition'`：使用 `transition` 动画
    - `'none'`：不使用动画

  - animateClassName：动画作用类名
    - 使用 `'animation'` 时，推荐使用 [`animate.css`](https://animate.style/)。取值方式为：`['animate__animated', 'animate__bounce']` 或 `['animated', 'bounce']`。
      > singsong: 如果自己实现，请遵照 `animate.css` 实现使用方式来。
    - 使用 `'transition'` 时，请按照如下的实现方式：
      ```css
      .fade-enter {
        opacity: 0;
      }
      .fade-enter-active {
        opacity: 1;
        transition: opacity 500ms;
      }
      ```
      取值方式为：`['fade-enter', 'fade-enter-active']`
  - timeout：动画执行时长，用于动画事件的不兼容时回退处理。如 `transition: opacity 500ms;`，timeout 就为 `500`。
  - parent：用于指定动画效果作用于元素的哪个父级元素。可取值：

    - 父元素的 selector 选择器（字符串）
    - 父级层级 level（整数）

  - element：指定 react 将生成的元素类型，默认为'img'。
  - placeholder：占位元素，除了支持普通的图片外，还支持 react 组件。

- **LazyimgWrapper：包裹组件，用于包裹 `Lazyimg` 组件，方便构建渐进性自然过渡效果。**
