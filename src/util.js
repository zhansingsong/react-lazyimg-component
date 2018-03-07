// 检测transitionend和transitionend
const whichEvent = (function() {
  let result = Object.create(null);
  let tempElement = document.createElement('b');
  let EVENTS = [
    {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
    },
    {
      animation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      OAnimation: 'oAnimationEnd',
      msAnimation: 'MSAnimationEnd',
    },
  ];
  EVENTS.forEach((items, index) => {
    Object.keys(items).reduce((accumulator, currentValue) => {
      tempElement.style[currentValue] !== undefined
        ? (result[index === 0 ? 'transition' : 'animation'] =
            items[currentValue])
        : undefined;
    }, undefined);
  });
  return result;
})();

export default {
  // isVisible
  isVisible(element) {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  },
  noop() {},
  // isPicture
  // isPicture(node) {
  //   let regPicture = /^picture$/i;
  //   return regPicture.test(node.nodeName || '');
  // },
  // filter props
  filterProps(props) {
    let configKeys = [
      'threshold',
      'event',
      'js_effect',
      'css_effect',
      'container',
      'skip_invisible',
      'appear',
      'force',
      'load',
      'node_type',
      'placeholder',
      'parent',
      'src',
      'srcSet',
    ];
    let configProps = Object.create(null);
    let originalProps = Object.create(null);
    Object.keys(props).forEach(item => {
      if (configKeys.indexOf(item) > -1) {
        configProps[item] = props[item];
      } else {
        if (item !== 'config') {
          originalProps[item] = props[item];
        }
      }
    });
    // configKeys.forEach(item=>{
    //   if(props[item]){
    //     configProps[item] = props[item];
    //   } else {
    //     originalProps[]
    //   }
    // });
    return {
      configProps: configProps,
      originalProps: originalProps,
    };
  },
  // generateID
  uid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  toDash(str) {
    return str.replace(/([A-Z])/g, function($1) {
      return '-' + $1.toLowerCase();
    });
  },
  // toCamel(str) {
  //   return str.replace(/(-[a-z])/g, function($1) {
  //     return $1.toUpperCase().replace('-', '');
  //   });
  // },
  // obj2Style
  obj2Style(obj) {
    if (!obj) {
      return false;
    }
    let styleString = [];
    Object.keys(obj).forEach(item => {
      styleString.push(this.toDash(item) + ':' + obj[item]);
    });
    return styleString.join(';');
  },

  // throttle
  throttle(fn, wait) {
    let timeout = null;
    let lastRun = 0;
    return function() {
      if (timeout) {
        return;
      }
      let elapsed = Date.now() - lastRun;
      let context = this;
      let args = arguments;
      let runCallback = function() {
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
  isExistImage(arr, src) {
    return arr.filter(item => {
      return item.src === src;
    })[0];
  },
  // isArray
  isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },
  // isNumber
  isNumber(num) {
    return Array.prototype.toString.call(num) === '[object Number]';
  },
  // isString
  // isString(str) {
  //   return Array.prototype.toString.call(str) === '[object String]';
  // },
  // isBoolean
  // isBoolean(obj) {
  //   return (
  //     obj === true ||
  //     obj === false ||
  //     Array.prototype.toString.call(obj) === '[object Boolean]'
  //   );
  // },
  // toArray
  toArray(list) {
    return Array.prototype.slice.call(list, 0);
  },
  // parentLevel: 获取level的parentNode
  parentLevel(el, level) {
    let current = el;
    while (level) {
      current = current.parentNode;
      if (current.nodeType === 9) {
        current = null;
      }
      --level;
    }
    return current;
  },
  // parents: 获取对应的selector的parentNode
  parents(el, selector) {
    let next = el.parentNode;


    if (next.nodeType === 9) {
      return null;
    }
    if (
      this.toArray(next.querySelectorAll(selector)).some(item => {
        return item === el;
      })
    ) {
      return next;
    } else {
      return this.parents(next, selector);
    }
  },

  // belowTheViewport
  belowTheViewport(element, settings) {
    let viewport;
    let container = settings.container;
    let elementRect = element.getBoundingClientRect();
    // let vh = window.innerHeight;

    if (container === undefined || container === window) {
      viewport = window.innerHeight;
    } else {
      viewport = container.getBoundingClientRect().bottom;
    }
    // 边界算在viewport里
    // return viewport < elementRect.top - ((vh * settings.threshold) | 0);
    return viewport < elementRect.top - settings.threshold;
  },

  // rightOfViewport
  rightOfViewport(element, settings) {
    let viewport;
    let container = settings.container;
    let elementRect = element.getBoundingClientRect();
    // let vw = window.innerWidth;

    if (container === undefined || container === window) {
      viewport = window.innerWidth;
    } else {
      viewport = container.getBoundingClientRect().right;
    }
    // 边界算在viewport里
    // return viewport < elementRect.left - ((vw * settings.threshold) | 0);
    return viewport < elementRect.left - settings.threshold;
  },

  // aboveTheViewport
  aboveTheViewport(element, settings) {
    let viewport;
    let container = settings.container;
    let elementRect = element.getBoundingClientRect();
    // let vh = window.innerHeight;

    if (container === undefined || container === window) {
      viewport = 0;
    } else {
      viewport = container.getBoundingClientRect().top;
    }
    // 边界算在viewport里
    // 可以不用加threshold
    // return viewport > elementRect.bottom + ((vh * settings.threshold) | 0);
    return viewport > elementRect.bottom + settings.threshold;
  },

  // leftOfViewport
  leftOfViewport(element, settings) {
    let viewport;
    let container = settings.container;
    let elementRect = element.getBoundingClientRect();
    // let vw = window.innerWidth;

    if (container === undefined || container === window) {
      viewport = 0;
    } else {
      viewport = container.getBoundingClientRect().left;
    }
    // 边界算在viewport里
    // 可以不用加threshold
    // return viewport > elementRect.right + ((vw * settings.threshold) | 0);
    return viewport > elementRect.right + settings.threshold;
  },

  // inTheViewport
  inTheViewport(element, settings) {
    return (
      !this.rightOfViewport(element, settings) &&
      !this.leftOfViewport(element, settings) &&
      !this.belowTheViewport(element, settings) &&
      !this.aboveTheViewport(element, settings)
    );
  },

  // onAnimatedEnd: animatedEnd事件，用于animate.css
  onAnimatedEnd(element, animationName, callback = this.noop, whichEvt) {
    if (element === undefined || animationName === undefined) {
      throw new Error('[react-lazyimg] element | animationName parameter is required.');
    }
    let event = whichEvent['animation'] || whichEvt;
    if (!event) {
      throw new Error('[react-lazyimg] AnimatedEnd event is not supported! able to use velocity.js instead.');
    }
    let tempAnimationName = animationName;
    if (!this.isArray(animationName)) {
      tempAnimationName = [animationName];
    }
    element.classList.add(...tempAnimationName);

    let cb = e => {
      element.classList.remove(...tempAnimationName);
      callback(e);
      element.removeEventListener(event, cb, false);
    };
    element.addEventListener(event, cb, false);
  },
};
