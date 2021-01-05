import React, {Component} from 'react';
import './style.scss';
import Title from '../Title';
// import Prism from '../Prism';
class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-wp">
          <h1 className="header-tt">
            <i className="c1">react-</i>
            <i className="c2">
              lazyimg-component<em className="version">v1.0.0</em>
            </i>
          </h1>
          <p className="header-desc">
            <strong className="tt">react-lazyimg-component v1.0.0</strong> 是使用 {' '}
            <a href="https://www.typescriptlang.org/" target="blank" className="link link-a">
              Typescript
            </a>
            、
            <a href="https://zh-hans.reactjs.org/docs/hooks-reference.html" target="blank" className="link link-a">
              React Hooks
            </a>
            、
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API" target="blank" className="link link-a">
              Intersection Observer API
            </a>
            完全重构的，React 图片懒加载小组件。并且组件参考了
            <a href="https://reactcommunity.org//switch-transition" target="blank" className="link link-a">
            React Transition Group 的 SwitchTransition 
            </a> 动画实现原理
            ，引入全新的渐进性自然过渡效果。
          </p>
          <Title title="特征" className="htt" />
          <ul className="header-list">
            <li>Typescript 静态类型检查，友好的代码提示与补全</li>
            <li>React Hooks 实现</li>
            <li>Intersection Observer API 取代 scroll 事件，代码更加简洁，性能更好。并且做了兼容处理</li>
            <li>兼容服务端渲染</li>
            <li>默认开启全新的渐进性自然过渡效果</li>
            <li>小巧轻便，简单易用，基本无学习成本</li>
            <li>支持 react 组件式 placeholder</li>
            <li>支持动画效果作用于父级元素</li>
            <li>支持响应式图片( picture / srcset )</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Header;
