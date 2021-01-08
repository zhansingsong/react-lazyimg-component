# 这种 React 渐进过渡效果怎么样

新项目中，使用 [Typescript](https://www.typescriptlang.org/) + [React(Hooks)](https://zh-hans.reactjs.org/docs/hooks-reference.html) 进行开发。项目需要使用**图片懒加载功能**，就对之前封装的 [react-lazyimg-component(v0.0.2)](https://github.com/zhansingsong/react-lazyimg-component/tree/v0.0.2) 组件进行重构。在保持原有功能基础上，做了一些优化，和改进。

- **Typescript** 静态类型检查，代码提示与补全更加完善
- **React Hooks** 实现
- **Intersection Observer API** 取代 scroll 事件，代码更加简洁，性能更好。并做了兼容处理。
- 兼容服务端渲染 **SSR**
- 定制组件的默认 `props`
- 支持 React 组件式 **placeholder**
- 支持动画效果作用于父级元素
- 支持响应式图片( **picture** / **srcset** )
- 默认开启全新的渐进性自然过渡效果

🚀[在线 Demo 效果，先睹为快 >>>>>>>>>>](http://zhansingsong.github.io/lazyimg-v1/)⛵️

其中 **“默认开启全新的渐进性自然过渡效果”** 功能中的 **渐进性自然过渡效果** 就是本文主要介绍内容。实现原理如下图 **【方案 B】** 所示：

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/v1/lazyimg-v1.png)

- **方案 A**：[react-lazyimg-component(v0.0.2)](https://github.com/zhansingsong/react-lazyimg-component/tree/v0.0.2) 版本默认使用的过渡动画效果。该方案存在一个问题：“在 img 图片下载好组件更新完，便对 img 图片使用 **淡入动画效果**。在某些动画效果下会存在 **跳闪现象**（如 fade 效果）”。因为过渡过程：

  > img(可见) -------> img(不可见) -------> img(可见)

- **方案 B**：为了避免跳闪现象，该方案采用了 **叠加遮挡方式控制 img 的可见性**。在 img 图片下载好，更新组件时，会同时更新 placeholder 与 img，并且 placeholder 叠加在 img 之上。接着对 placeholder 使用 **淡出动画效果**。当动画执行完后，更新组件删除 placeholder。

  > singsong: **方案 B** 参考了 [React Transition Group 的 SwitchTransition](https://reactcommunity.org//switch-transition) 动画实现原理。😝😝😝

### 对比效果图

![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/v1/lazyimg.gif)

> singsong: Demo 中第一张图片 **未使用** “渐进性自然过渡效果”，会存在跳闪现象。第二张图片 **使用** “渐进性自然过渡效果”，效果更加自然！😀

### show code

```js
// 引入 react-lazyimg-component
import Lazyimg, {LazyimgWrapper, withLazyimg} from 'react-lazyimg-component';
// 引入 Placeholder 组件
import Placeholder from './Placeholder';
// 引入 loading.svg
import Loading from './img/loading.svg';
// 使用 withLazyimg 配置 Lazyimg 组件的默认 props
const Lazy = withLazyimg({
  placeholder: <Placeholder img={Loading} />,
  threshold: 0.98,
});
<LazyimgWrapper style={{height: '100%', width: '100%'}}>
  <Lazy
    animateType="animation"
    animateClassName={['animated', 'slideOutDown']}
    timeout={1000}
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
  />
</LazyimgWrapper>;
```

为了在 img 图片下载好更新组件时，控制 placeholder 与 img 的叠加遮挡。**react-lazyimg-component** 组件提供了 `LazyimgWrapper` 容器组件。

> 为什么要单独提出一个 `LazyimgWrapper`

> - 方便自定义容器样式
> - 通知 `Lazyimg` 组件开启 “渐进性自然过渡效果”


![](https://raw.githubusercontent.com/zhansingsong/react-lazyimg-component/master/images/v1/animation.gif)

## 结束语

重构后 [react-lazyimg-component(v1.0.0)](https://github.com/zhansingsong/react-lazyimg-component)
组件不仅支持 **方案 A**，也支持 **方案 B**。这里介绍 **方案 B**，并不代表它优于 **方案 A**。只有针对不同的使用场景，二者谁最更合适。这里与大家分享 **方案 B**，方便大家在使用时多一种选择。
