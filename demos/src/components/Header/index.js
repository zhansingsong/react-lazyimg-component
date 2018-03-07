import React, { Component } from 'react';
import './style.scss';
import Prism from '../Prism';
class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-wp">
          <h1 className="header-tt">
            <i className="c1">react-</i>
            <i className="c2">lazyimg</i>
          </h1>
          <p className="header-desc">
            一个基于<a className="link link-a" href="https://github.com/tuupola/jquery_lazyload" target="blank">jquery.lazyload</a>，结合<a href="https://github.com/facebook/react/" target="blank" className="link link-a">react</a>组件概念完成的图片懒加载小插件。支持全局配置，config 配置，个性定制等特性，还支持<a
              className="link link-a"
              href="https://github.com/daneden/animate.css"
              target="blank"
            >
              {' '}
              animate.css
            </a>和<a
              className="link link-a"
              href="https://github.com/julianshapiro/velocity"
              target="blank"
            >
              velocity.js
            </a>动画库配置。用法上做到了尽量与<strong className="strong">jquery.lazyload</strong>保持一致，如果你之前用过<strong className="strong">jquery.lazyload</strong>完全无学习成本过渡，直接上手~~~~~
          </p>
        </div>
      </div>
    );
  }
}
export default Header;
