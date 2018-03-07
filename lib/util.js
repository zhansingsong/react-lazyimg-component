function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var whichEvent = function () {
  var result = Object.create(null);
  var tempElement = document.createElement('b');
  var EVENTS = [{
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend'
  }, {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }];
  EVENTS.forEach(function (items, index) {
    Object.keys(items).reduce(function (accumulator, currentValue) {
      tempElement.style[currentValue] !== undefined ? result[index === 0 ? 'transition' : 'animation'] = items[currentValue] : undefined;
    }, undefined);
  });
  return result;
}();

export default {
  isVisible: function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  },
  noop: function noop() {},
  filterProps: function filterProps(props) {
    var configKeys = ['threshold', 'event', 'js_effect', 'css_effect', 'container', 'skip_invisible', 'appear', 'force', 'load', 'node_type', 'placeholder', 'parent', 'src', 'srcSet'];
    var configProps = Object.create(null);
    var originalProps = Object.create(null);
    Object.keys(props).forEach(function (item) {
      if (configKeys.indexOf(item) > -1) {
        configProps[item] = props[item];
      } else {
        if (item !== 'config') {
          originalProps[item] = props[item];
        }
      }
    });

    return {
      configProps: configProps,
      originalProps: originalProps
    };
  },
  uid: function uid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  toDash: function toDash(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  },
  obj2Style: function obj2Style(obj) {
    var _this = this;

    if (!obj) {
      return false;
    }
    var styleString = [];
    Object.keys(obj).forEach(function (item) {
      styleString.push(_this.toDash(item) + ':' + obj[item]);
    });
    return styleString.join(';');
  },
  throttle: function throttle(fn, wait) {
    var timeout = null;
    var lastRun = 0;
    return function () {
      if (timeout) {
        return;
      }
      var elapsed = Date.now() - lastRun;
      var context = this;
      var args = arguments;
      var runCallback = function runCallback() {
        lastRun = Date.now();
        timeout = false;
        fn.apply(context, args);
      };
      if (elapsed >= wait) {
        runCallback();
      } else {
        timeout = setTimeout(runCallback, wait);
      }
    };
  },
  isExistImage: function isExistImage(arr, src) {
    return arr.filter(function (item) {
      return item.src === src;
    })[0];
  },
  isArray: function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },
  isNumber: function isNumber(num) {
    return Array.prototype.toString.call(num) === '[object Number]';
  },
  toArray: function toArray(list) {
    return Array.prototype.slice.call(list, 0);
  },
  parentLevel: function parentLevel(el, level) {
    var current = el;
    while (level) {
      current = current.parentNode;
      if (current.nodeType === 9) {
        current = null;
      }
      --level;
    }
    return current;
  },
  parents: function parents(el, selector) {
    var next = el.parentNode;

    if (next.nodeType === 9) {
      return null;
    }
    if (this.toArray(next.querySelectorAll(selector)).some(function (item) {
      return item === el;
    })) {
      return next;
    } else {
      return this.parents(next, selector);
    }
  },
  belowTheViewport: function belowTheViewport(element, settings) {
    var viewport = void 0;
    var container = settings.container;
    var elementRect = element.getBoundingClientRect();


    if (container === undefined || container === window) {
      viewport = window.innerHeight;
    } else {
      viewport = container.getBoundingClientRect().bottom;
    }

    return viewport < elementRect.top - settings.threshold;
  },
  rightOfViewport: function rightOfViewport(element, settings) {
    var viewport = void 0;
    var container = settings.container;
    var elementRect = element.getBoundingClientRect();


    if (container === undefined || container === window) {
      viewport = window.innerWidth;
    } else {
      viewport = container.getBoundingClientRect().right;
    }

    return viewport < elementRect.left - settings.threshold;
  },
  aboveTheViewport: function aboveTheViewport(element, settings) {
    var viewport = void 0;
    var container = settings.container;
    var elementRect = element.getBoundingClientRect();


    if (container === undefined || container === window) {
      viewport = 0;
    } else {
      viewport = container.getBoundingClientRect().top;
    }

    return viewport > elementRect.bottom + settings.threshold;
  },
  leftOfViewport: function leftOfViewport(element, settings) {
    var viewport = void 0;
    var container = settings.container;
    var elementRect = element.getBoundingClientRect();


    if (container === undefined || container === window) {
      viewport = 0;
    } else {
      viewport = container.getBoundingClientRect().left;
    }

    return viewport > elementRect.right + settings.threshold;
  },
  inTheViewport: function inTheViewport(element, settings) {
    return !this.rightOfViewport(element, settings) && !this.leftOfViewport(element, settings) && !this.belowTheViewport(element, settings) && !this.aboveTheViewport(element, settings);
  },
  onAnimatedEnd: function onAnimatedEnd(element, animationName) {
    var _element$classList;

    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.noop;
    var whichEvt = arguments[3];

    if (element === undefined || animationName === undefined) {
      throw new Error('[react-lazyimg] element | animationName parameter is required.');
    }
    var event = whichEvent['animation'] || whichEvt;
    if (!event) {
      throw new Error('[react-lazyimg] AnimatedEnd event is not supported! able to use velocity.js instead.');
    }
    var tempAnimationName = animationName;
    if (!this.isArray(animationName)) {
      tempAnimationName = [animationName];
    }
    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(tempAnimationName));

    var cb = function cb(e) {
      var _element$classList2;

      (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(tempAnimationName));
      callback(e);
      element.removeEventListener(event, cb, false);
    };
    element.addEventListener(event, cb, false);
  }
};