import { ILazyimgProps } from './Lazyimg';
type AnimateType = Exclude<NonNullable<ILazyimgProps['animateType']>, 'none'>;
// 检测transitionend和transitionend
const whichEvent = (function () {
  if (typeof window === 'undefined') {
    return {};
  }
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
  let result: { [P in AnimateType]?: string } = Object.create(null);
  EVENTS.forEach((items: any, index) => {
    Object.keys(items).forEach((currentValue: any) => {
      tempElement.style[currentValue] !== undefined // eslint-disable-line
        ? (result[index === 0 ? 'transition' : 'animation'] = items[currentValue])
        : undefined;
    });
  });
  return result;
})();

export function appendStyle(styleText: string, id?: string) {
  if (document.head.querySelector('#lazyimg')) {
    return;
  }
  const styleElement = document.createElement('style');
  styleElement.id = id || 'lazyimg';
  document.head.appendChild(styleElement);
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(styleText));
}

export function animate(
  type: string,
  element: HTMLElement,
  animateClassName: NonNullable<ILazyimgProps['animateClassName']>,
  timeout: NonNullable<ILazyimgProps['timeout']>,
  endCallback: NonNullable<ILazyimgProps['end']>
) {
  if (element === undefined || animateClassName === undefined || timeout === undefined) {
    throw new Error(
      `[react-lazyimg] ${element === undefined ? 'element' : ''}${animateClassName === undefined ? 'animateClassName' : ''}${
        timeout === undefined ? 'timeout' : ''
      } parameter is required.`
    );
  }
  const event = whichEvent[type as AnimateType];
  const addEventListener = () => {
    const detach = () => {
      console.log(element, 'de')
      element.classList.remove(...animateClassName);
      endCallback(element);
    };
    // 回退处理
    if (!event) {
      const fallback = () => {
        setTimeout(() => {
          detach();
        }, timeout);
      };
      fallback();
      return;
    }
    let cb = () => {
      detach();
      element.removeEventListener(event, cb, false);
    };
    element.addEventListener(event, cb, false);
  };

  if (type === 'transition') {
    // 实现原理参考：https://reactcommunity.org/react-transition-group/css-transition
    element.classList.add(animateClassName[0]);
    // 引起页面重绘，确保第一个类名生效
    element.scrollTop; // eslint-disable-line
    element.classList.add(animateClassName[1]);
  } else {
    // animatedEnd事件，用于animate.css
    let tempAnimationName = animateClassName;
    if (!Array.isArray(animateClassName)) {
      tempAnimationName = [animateClassName];
    }
    element.classList.add(...tempAnimationName);
  }
  addEventListener();
}

export function parentLevel(el: HTMLElement, level: number) {
  let current = el;
  while (level) {
    current = current.parentNode as HTMLElement;
    if (current.nodeType === 9) {
      return null;
    }
    --level;
  }
  return current;
}
// parents: 获取对应的selector的parentNode
export function parents(el: HTMLElement, selector: string): any {
  let next = el.parentNode as HTMLElement;
  if (next.nodeType === 9) {
    return null;
  }

  if (
    Array.prototype.slice.call(document.querySelectorAll(selector), 0).some((item) => {
      return item === next;
    })
  ) {
    return next;
  } else {
    return parents(next, selector);
  }
}
