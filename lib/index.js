var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Util from './util';
import PropTypes from 'prop-types';

function withLazyimg() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var _defaults = {
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
    placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
  };

  var Lazyimg = function (_Component) {
    _inherits(Lazyimg, _Component);

    function Lazyimg(props) {
      _classCallCheck(this, Lazyimg);

      var _this = _possibleConstructorReturn(this, (Lazyimg.__proto__ || Object.getPrototypeOf(Lazyimg)).call(this, props));

      _this.lazyimgs = [];

      _this.initState(props, true);

      _this.el = null;
      return _this;
    }

    _createClass(Lazyimg, [{
      key: 'initState',
      value: function initState(props, isInit) {
        var _this2 = this;

        var _Util$filterProps = Util.filterProps(props),
            configProps = _Util$filterProps.configProps,
            originalProps = _Util$filterProps.originalProps;

        var settings = Object.assign({}, _defaults, props.config, configProps);

        if (isInit) {
          this.state = {
            isLoaded: false,
            isFailed: false
          };
        } else {
          this.setState({
            isLoaded: false,
            isFailed: false
          });
        }

        this.currentImg = {
          id: Util.uid(),
          src: settings.src,
          srcSet: settings.srcSet,
          nodeType: settings.node_type,
          loaded: false,
          failed: false,
          once: true,
          onCallback: Util.throttle(function () {
            _this2.currentImg && !_this2.currentImg.isDetach && _this2.check();
          }, 300),
          onCb: this.check.bind(this),
          settings: settings,
          originalProps: originalProps,
          proxyImg: new Image(),
          detach: this.detach.bind(this),
          isDetach: false,
          isAnimation: false
        };
        this.lazyimgs.push(this.currentImg);
      }
    }, {
      key: 'check',
      value: function check() {
        var _this3 = this;

        var el = this.el;
        var currentImg = this.currentImg;
        var src = currentImg.src,
            loaded = currentImg.loaded,
            once = currentImg.once,
            settings = currentImg.settings,
            proxyImg = currentImg.proxyImg;

        if (settings.skip_invisible && !Util.isVisible(el)) {
          return;
        }

        if (settings.force || Util.inTheViewport(el, settings) && !loaded && once) {
          currentImg.once = false;

          if (settings.appear && typeof settings.appear === 'function') {
            settings.appear.call(this, el, settings);
          }

          proxyImg.src = src;

          if (settings.srcSet !== undefined) {
            proxyImg.srcset = settings.srcSet;
          }
          proxyImg.onload = function () {
            currentImg.loaded = true;

            _this3.setState({
              isLoaded: true,
              isFailed: false
            });
          };

          proxyImg.onerror = function (error) {
            currentImg.failed = true;

            _this3.setState({
              isFailed: true
            });
            console.error(error);
          };
        }
      }
    }, {
      key: 'detach',
      value: function detach() {
        var el = this.el;
        var currentImg = this.currentImg;
        var onCb = currentImg.onCb,
            onCallback = currentImg.onCallback,
            settings = currentImg.settings,
            proxyImg = currentImg.proxyImg,
            detach = currentImg.detach,
            isDetach = currentImg.isDetach;

        if (0 === settings.event.indexOf('scroll')) {
          settings.container.removeEventListener(settings.event, onCallback, false);
        } else {
          el.removeEventListener(settings.event, onCb, false);
        }

        window.removeEventListener('resize', onCallback, false);

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
      }
    }, {
      key: 'init',
      value: function init() {
        this.check();
        var el = this.el;
        var _currentImg = this.currentImg,
            onCb = _currentImg.onCb,
            onCallback = _currentImg.onCallback,
            settings = _currentImg.settings;

        if (0 === settings.event.indexOf('scroll')) {
          settings.container.addEventListener(settings.event, onCallback, false);
        } else {
          el.addEventListener(settings.event, onCb, false);
        }
        window.addEventListener('resize', onCallback, false);
      }
    }, {
      key: 'filterLoadedImages',
      value: function filterLoadedImages(props) {
        var el = this.el;
        var src = props.src,
            srcSet = props.srcSet;

        var loadedLazyImg = Util.isExistImage(this.lazyimgs, src);

        if (loadedLazyImg && loadedLazyImg.loaded) {
          if (loadedLazyImg.nodeType === 'img') {
            el.setAttribute('src', src);
            if (srcSet !== undefined) {
              el.setAttribute('srcset', srcSet);
            }
          } else {
            el.style.backgroundImage = "url('" + src + "')";
          }

          return true;
        }
        return false;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.init();
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        if (this.props.src !== nextProps.src) {
          if (this.filterLoadedImages(nextProps)) {
            return false;
          }
          this.initState(nextProps);
          this.init();
        }
        return true;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var el = this.el;
        var currentImg = this.currentImg;
        var settings = currentImg.settings,
            detach = currentImg.detach,
            isDetach = currentImg.isDetach,
            loaded = currentImg.loaded,
            failed = currentImg.failed,
            originalProps = currentImg.originalProps,
            isAnimation = currentImg.isAnimation;

        if (loaded) {
          if (settings.load && typeof settings.load === 'function') {
            settings.load.call(this, el, currentImg);
          }

          var animateEl = el;
          if (settings.css_effect || settings.js_effect) {
            if (!!settings.parent) {
              animateEl = Util.isNumber(settings.parent) ? Util.parentLevel(el, settings.parent) : Util.parents(el, settings.parent);
            }
          }

          if (settings.css_effect) {
            if (!isAnimation) {
              currentImg.isAnimation = true;
              Util.onAnimatedEnd(animateEl, settings.css_effect);
            }
          }

          if (!settings.css_effect && settings.js_effect) {
            if (!isAnimation) {
              currentImg.isAnimation = true;

              window.Velocity(animateEl, settings.js_effect, {
                duration: 600,
                complete: function complete(el) {
                  el[0].setAttribute('style', Util.obj2Style(originalProps.style) || '');
                }
              });
            }
          }

          !isDetach && detach();
        }
        if (failed) {
          if (settings.error && typeof settings.error === 'function') {
            settings.error.call(this, el, currentImg);
          }

          !isDetach && detach();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var currentImg = this.currentImg;
        currentImg && !currentImg.isDetach && currentImg.detach();
        currentImg.settings = null;
        currentImg.originalProps = null;
        currentImg = null;
        this.el = null;
        this.detach = null;
        this.lazyimgs.length = 0;
        this.lazyimgs = null;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var currentImg = this.currentImg;
        var settings = currentImg.settings,
            originalProps = currentImg.originalProps,
            src = currentImg.src,
            srcSet = currentImg.srcSet,
            nodeType = currentImg.nodeType;

        var children = null;
        var lazyImgProps = Object.assign({
          ref: function ref(el) {
            return _this4.el = el;
          }
        }, originalProps);

        if (this.state.isLoaded) {
          if (srcSet !== undefined) {
            lazyImgProps.srcSet = srcSet;
          }
          if (nodeType === 'img') {
            lazyImgProps.src = src;
          } else {
            lazyImgProps.style = { backgroundImage: 'url(\'' + src + '\')' };
            if (originalProps.style) {
              currentImg.originalProps.style = Object.assign({}, originalProps.style, lazyImgProps.style);
            }
          }
        } else {
          if (React.isValidElement(settings.placeholder)) {
            nodeType = 'div';
            children = React.createElement(settings.placeholder.type, settings.placeholder.props, null);

            lazyImgProps = Object.assign({}, lazyImgProps, { className: '' });
          } else {
            if (nodeType === 'img') {
              lazyImgProps.src = settings.placeholder;
            } else {
              lazyImgProps.style = {
                backgroundImage: 'url(\'' + settings.placeholdersrc + '\')'
              };
            }
          }
        }
        return React.createElement(nodeType, lazyImgProps, children);
      }
    }]);

    return Lazyimg;
  }(Component);

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
      placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
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
    src: PropTypes.string.isRequired
  };

  Lazyimg.defaultProps = {
    config: config
  };

  return Lazyimg;
}

export { withLazyimg };

export default withLazyimg();