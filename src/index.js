import React, { Component } from 'react';
import Util from './util';
import PropTypes from 'prop-types';

/**
 * withLazyimg
 *
 * @param {Object} config
 *
 * support picture tag
 * picturefill:https://github.com/scottjehl/picturefill
 *
 */

function withLazyimg(config = {}) {
  /**
   * default configurations
   *
   * animation effect powered by velocity.js and animated.css
   * 
   * @css_effect: https://github.com/daneden/animate.css
   * @js_effect: https://github.com/julianshapiro/velocity/blob/master/velocity.ui.js
   *
   * transition.slideUpBigIn
   * transition.flipBounceYIn
   * transition.swoopIn
   * transition.whirlIn
   * transition.expandIn
   *
   */

  const _defaults = {
    threshold: 0,
    event: 'scroll',
    js_effect: undefined,
    css_effect: undefined,
    container: window,
    skip_invisible: true,
    parent: undefined,
    appear: null,
    force: false,
    load: null,
    error: null,
    node_type: 'img',
    placeholder:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  };
  // 默认动画样式
  // const FADEIN = '.react-lazyimg-fadeIn{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}';

  class Lazyimg extends Component {
    constructor(props) {
      super(props);
      // 待加载或已加载images
      this.lazyimgs = [];
      // 初始化状态
      this.initState(props, true);
      // 缓存el
      this.el = null;
    }

    initState(props, isInit) {
      // 过滤props
      let { configProps, originalProps } = Util.filterProps(props);
      let settings = Object.assign({}, _defaults, props.config, configProps);

      // 设置state
      if (isInit) {
        this.state = {
          // src: settings.placeholder,
          isLoaded: false,
          isFailed: false,
        };
      } else {
        this.setState({
          // src: settings.placeholder,
          isLoaded: false,
          isFailed: false,
        });
      }
      // 缓存当前image
      this.currentImg = {
        id: Util.uid(),
        src: settings.src,
        srcSet: settings.srcSet,
        nodeType: settings.node_type,
        loaded: false,
        failed: false,
        once: true,
        onCallback: Util.throttle(() => {
          // 处理在detach之后，存在延迟执行回调函数
          this.currentImg && !this.currentImg.isDetach && this.check();
        }, 300),
        onCb: this.check.bind(this),
        settings: settings,
        originalProps: originalProps,
        proxyImg: new Image(),
        detach: this.detach.bind(this),
        isDetach: false,
        isAnimation: false,
      };
      this.lazyimgs.push(this.currentImg);
    }

    // check
    check() {
      console.log('check---<lazyimg');
      let el = this.el;
      let currentImg = this.currentImg;
      let { src, loaded, once, settings, proxyImg } = currentImg;
      // skip invisible
      if (settings.skip_invisible && !Util.isVisible(el)) {
        return;
      }
      // process
      if (settings.force || Util.inTheViewport(el, settings) && !loaded && once) {
        console.log('check---loading');
        // execute once
        currentImg.once = false;
        // appear hook
        if (settings.appear && typeof settings.appear === 'function') {
          settings.appear.call(this, el, settings);
        }
        // proxy img
        proxyImg.src = src;
        // support srcset
        // srcSet(react: https://reactjs.org/docs/dom-elements.html)
        if (settings.srcSet !== undefined) {
          proxyImg.srcset = settings.srcSet;
        }
        proxyImg.onload = () => {
          // 已加载标识
          currentImg.loaded = true;
          // 设置状态
          this.setState({
            // src: src,
            isLoaded: true,
            isFailed: false,
          });
        };
        // proxyImg error
        proxyImg.onerror = error => {
          // 已加载标识
          currentImg.failed = true;
          // 设置状态
          this.setState({
            isFailed: true,
          });
          console.error(error);
        };
      }
    }

    // detach for init binding
    detach() {
      // 缓存el
      let el = this.el;
      let currentImg = this.currentImg;
      let {
        onCb,
        onCallback,
        settings,
        proxyImg,
        detach,
        isDetach,
      } = currentImg;
      // detach bind event
      if (0 === settings.event.indexOf('scroll')) {
        settings.container.removeEventListener(
          settings.event,
          onCallback,
          false
        );
      } else {
        el.removeEventListener(settings.event, onCb, false);
      }
      // bind size event
      window.removeEventListener('resize', onCallback, false);

      // 针对IOS5中使用返回键时，会导致图片加载
      // if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) {
      //   el.onPageshow = event => {
      //     if (event.originalEvent && event.originalEvent.persisted) {
      //       this.update.bind(this);
      //     }
      //   };
      //   window.addEventListener('pageshow', el.onPageshow, false);
      // }

      // null
      proxyImg.onload = null;
      proxyImg.onerror = null;
      proxyImg = null;
      onCallback = null;
      onCb = null;
      detach = Util.noop;
      isDetach = true;
      currentImg.proxyImg = proxyImg;
      currentImg.onCallback = onCallback;
      currentImg.onCb = onCb;
      currentImg.detach = detach;
      currentImg.isDetach = isDetach;
      console.log('---> detach <---');
    }
    // init
    init() {
      console.log('init<-----lazyimg');
      // initialization
      this.check();
      let el = this.el;
      let { onCb, onCallback, settings } = this.currentImg;
      // bind events
      if (0 === settings.event.indexOf('scroll')) {
        // passive of Event : http://www.cnblogs.com/ziyunfei/p/5545439.html
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        settings.container.addEventListener(settings.event, onCallback, false);
      } else {
        el.addEventListener(settings.event, onCb, false);
      }
      window.addEventListener('resize', onCallback, false);
    }

    // 过滤已加载的图片
    filterLoadedImages(props) {
      let el = this.el;
      let { src, srcSet } = props;
      let loadedLazyImg = Util.isExistImage(this.lazyimgs, src);
      // console.log('this.lazyimgs : %o',this.lazyimgs)
      if (loadedLazyImg && loadedLazyImg.loaded) {
        if (loadedLazyImg.nodeType === 'img') {
          el.setAttribute('src', src);
          if (srcSet !== undefined) {
            el.setAttribute('srcset', srcSet);
          }
        } else {
          el.style.backgroundImage = "url('" + src + "')";
        }
        // this.currentImg = loadedLazyImg;
        return true;
      }
      return false;
    }

    componentDidMount() {
      console.log('componentDidMount-->lazyimg: %o', this.el);
      this.init();
    }
    // componentWillReceiveProps(nextProps){
    //   console.log('componentWillReceiveProps-->lazyimg: %o', nextProps);
    //   if (this.props !== nextProps) {
    //     // debugger;
    //     console.log('shouldComponentUpdate---init---->lazyimg');
    //     debugger;
    //     if (!this.filterLoadedImages(nextProps)) {
    //       this.initState(nextProps);
    //       this.init();
    //       console.log('shouldComponentUpdate---->lazyimg');
    //       // return false;
    //     } 
    //   }
    // }
    shouldComponentUpdate(nextProps) {
      console.log('shouldComponentUpdate---->lazyimg: %o', this.el);
      // debugger;
      if (this.props.src !== nextProps.src) {
        // console.log('shouldComponentUpdate---init---->lazyimg');
        if (this.filterLoadedImages(nextProps)) {
          console.log('shouldComponentUpdate---->lazyimg');
          return false;
        }
          this.initState(nextProps);
          this.init();
      }
      return true;
    }

    componentDidUpdate() {
      // console.log('componentDidUpdate-->lazyimg: %o', this.el);
      let el = this.el;
      let currentImg = this.currentImg;
      let {
        settings,
        detach,
        isDetach,
        loaded,
        failed,
        originalProps,
        isAnimation,
      } = currentImg;
      // 处理回调函数及清除工作
      if (loaded) {
        // load hook
        if (settings.load && typeof settings.load === 'function') {
          settings.load.call(this, el, currentImg);
        }
        // 处理动画
        let animateEl = el;
        if(settings.css_effect || settings.js_effect){
          if (!!settings.parent) {
            animateEl = Util.isNumber(settings.parent)
              ? Util.parentLevel(el, settings.parent)
              : Util.parents(el, settings.parent);
          }
        }

        if(settings.css_effect){
          if (!isAnimation) {
            currentImg.isAnimation = true;
            Util.onAnimatedEnd(animateEl, settings.css_effect)
          }
        }

        if(!settings.css_effect && settings.js_effect){
          // execute effect animation
          if (!isAnimation) {
            currentImg.isAnimation = true;
            console.log('isAnimation:  ',currentImg)
            window.Velocity(animateEl, settings.js_effect, {
              duration: 600,
              complete: el => {
                // 重置style样式
                // bug: https://stackoverflow.com/questions/32468352/uncaught-typeerror-cannot-set-property-style-of-htmlelement-which-has-only-a
                el[0].setAttribute('style', Util.obj2Style(originalProps.style) || '');
              },
            });
          }
        }
        // clear up
        !isDetach && detach();
      }
      if (failed) {
        // error hook
        if (settings.error && typeof settings.error === 'function') {
          settings.error.call(this, el, currentImg);
        }
        // clear up
        !isDetach && detach();
      }
    }

    componentWillUnmount() {
      // if (this.el.onPageshow) {
      //   window.removeEventListener('pageshow', this.el.onPageshow, false);
      // }
      let currentImg = this.currentImg;
      currentImg && !currentImg.isDetach && currentImg.detach();
      currentImg.settings = null;
      currentImg.originalProps = null;
      currentImg = null;
      this.el = null;
      this.detach = null;
      this.lazyimgs.length = 0;
      this.lazyimgs = null;
    }

    render() {
      // let attributes = {....this.originalProps,src: this.state.src,ref: img => (this.el = img)};
      let currentImg = this.currentImg;
      let {
        settings,
        originalProps,
        src,
        srcSet,
        nodeType,
      } = currentImg;
      let children = null;
      let lazyImgProps = {
        ref: el => (this.el = el),
        ...originalProps
      };

      if (this.state.isLoaded) {
        if (srcSet !== undefined) {
          lazyImgProps.srcSet = srcSet;
        }
        if (nodeType === 'img') {
          lazyImgProps.src = src;
        } else {
          lazyImgProps.style = { backgroundImage: `url('${src}')` };
          if (originalProps.style) {
            currentImg.originalProps.style = {
              ...originalProps.style,
              ...lazyImgProps.style,
            };
          }
        }
      } else {
        if (React.isValidElement(settings.placeholder)) {
          // 确保ref的获取
          nodeType = 'div';
          children = React.createElement(settings.placeholder.type, settings.placeholder.props, null);
          // 不影响placeholder的样式
          lazyImgProps = { ...lazyImgProps, className: '' };
        } else {
          if (nodeType === 'img') {
            lazyImgProps.src = settings.placeholder;
          } else {
            lazyImgProps.style = {
              backgroundImage: `url('${settings.placeholdersrc}')`,
            };
          }
        }
      }
      return React.createElement(nodeType, lazyImgProps, children);
    }
  }

  // PropTypes
  Lazyimg.propTypes = {
    config: PropTypes.shape({
      threshold: PropTypes.number,
      event: PropTypes.string,
      js_effect: PropTypes.string,
      css_effect: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      container: PropTypes.node,
      skip_invisible: PropTypes.bool,
      parent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      appear: PropTypes.func,
      force: PropTypes.bool,
      load: PropTypes.func,
      error: PropTypes.func,
      node_type: PropTypes.string,
      placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
    threshold: PropTypes.number,
    event: PropTypes.string,
    js_effect: PropTypes.string,
    css_effect: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    container: PropTypes.node,
    skip_invisible: PropTypes.bool,
    parent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    appear: PropTypes.func,
    force: PropTypes.bool,
    load: PropTypes.func,
    error: PropTypes.func,
    node_type: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    src: PropTypes.string.isRequired,
  };
  // defaultProps
  Lazyimg.defaultProps = {
    config: config,
  };

  return Lazyimg;
}

export { withLazyimg };

export default withLazyimg();
