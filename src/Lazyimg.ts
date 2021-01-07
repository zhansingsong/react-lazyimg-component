import React, {
  FC,
  useEffect,
  useState,
  useRef,
  createElement,
  HTMLProps,
  CSSProperties,
  ReactElement,
  cloneElement,
  isValidElement,
  Children,
  Fragment,
} from 'react';
import 'intersection-observer'; // intersection-observer polyfill
import { animate, parentLevel, parents, appendStyle } from './Util';

export const ID = Date.now() + '';

export interface ILazyimgProps {
  // 指定元素的 node Type，默认为 `img`
  element?: string;
  // 为 `true` 时，直接替换 src，不使用懒加载行为
  force?: boolean;
  // 在图片加载好替换前 hook 回调
  loaded?: (el?: HTMLElement) => void | boolean;
  // 动画执行完完 hook 回调
  end?: (el?: HTMLElement) => void;
  // 过渡动画类型
  animateType?: 'none' | 'transition' | 'animation';
  // 动画作用类名
  animateClassName?: string[];
  // 动画执行时长，用于动画事件的不兼容时回退处理
  timeout?: number; // 回退方案
  // 动画作用与父级元素
  parent?: number | string;
  // 指定图片加载前，显示内容
  placeholder?: React.ReactNode;
  // intersection config
  root?: Element;
  rootMargin?: string;
  threshold?: number[];
}

interface ILazyimgType extends Omit<HTMLProps<HTMLElement>, 'placeholder'>, ILazyimgProps {
  src: string;
  srcSet?: string;
  // 用于开启自然动画过渡效果。由 LazyimgWrapper 组件自动传递
  isLazyimgWrapper?: boolean;
}
export const withLazyimg:(config?: ILazyimgProps) => FC<ILazyimgType> = (config={}) => {
const Lazyimg: FC<ILazyimgType> = (props) => {
  const defaults = {
    force: false,
    element: 'img',
    placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    animateType: 'transition',
    isLazyimgWrapper: false,
    timeout: 300,
    root: null,
    rootMargin: '0px',
    threshold: 0,
    loaded: () => {},
    end: () => {},
  }
  const finalProps = {...defaults, ...config, ...props};
  let {
    force,
    element,
    placeholder,
    animateType,
    animateClassName,
    isLazyimgWrapper,
    timeout,
    parent,
    src,
    srcSet,
    root,
    rootMargin,
    threshold,
    children,
    loaded = () => {},
    end = () => {},
    ...restProps
  } = finalProps;

  type ContextType = {
    isLoaded: boolean;
  };
  const elementRef = useRef<HTMLElement>(null);
  const currentReactElement = useRef<ReactElement | null>(null);
  const contextRef = useRef<ContextType>({ isLoaded: false });
  const [animated, setAnimated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // 默认动画配置
  if (animateType === 'transition' && animateClassName === undefined) {
    animateClassName = [`lazyimg-enter`, `lazyimg-enter-active`];
    appendStyle(`
      .lazyimg-exit {
        opacity: 0.9;
      }
      .lazyimg-exit-active {
        opacity: 0;
        transition: opacity 300ms;
      }
      .lazyimg-enter {
        opacity: 0.1;
      }
      .lazyimg-enter-active {
        opacity: 1;
        transition: opacity 300ms;
      }
    `);
    if (isLazyimgWrapper && !animated) {
      animateClassName = [`lazyimg-exit`, `lazyimg-exit-active`];
    }
  }
  if (isLazyimgWrapper && !animated) {
    // animateClassName = [`lazyimg-exit`, `lazyimg-exit-active`];
    const endCallback = end;
    end = (el) => {
      endCallback(el);
      setAnimated(true);
    };
  }

  const proxyImg = (src: string, srcSet?: string) => {
    const proxy = new Image();
    proxy.src = src;
    // 如果存在 srcSet
    if (srcSet !== undefined) {
      proxy.srcset = srcSet;
    }
    proxy.onload = () => {
      setIsLoaded(true);
      contextRef.current.isLoaded = true;
    };
    proxy.onerror = () => {
      setIsLoaded(false);
      contextRef.current.isLoaded = false;
    };
  };

  useEffect(() => {
    if (!elementRef.current || force) {
      return;
    }
    if (contextRef.current.isLoaded) {
      if (typeof loaded === 'function') {
        const isSkip = loaded(elementRef.current);
        if(isSkip){
          return;
        }
      }

      let animateElement: HTMLElement = elementRef.current;
      if (parent !== undefined) {
        if (isLazyimgWrapper) {
          console.warn(
            '[Lazyimg] ⚠️ "parent" property invalid, as "isLazyimgWrapper" property takes a priority over "parent" property. if you need "parent" property, able to turn "isLazyimgWrapper" property off.'
          );
        } else {
          if (typeof parent === 'number') {
            animateElement = parentLevel(elementRef.current, parent) || elementRef.current;
          } else {
            animateElement = parents(elementRef.current, parent) || elementRef.current;
          }
        }
      }
      animateType !== 'none' && animate(animateType, animateElement, animateClassName!, timeout, end);
    }
  }, [isLoaded]); // eslint-disable-line
  useEffect(() => {
    if (animated) {
      end(elementRef.current as HTMLElement);
    }
  }, [animated, end]);

  useEffect(() => {
    if (force) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (elementRef.current !== null) {
            // 开始加载
            proxyImg(src, srcSet);
            observer.unobserve(elementRef.current);
            observer.disconnect();
          }
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [src]); // eslint-disable-line

  let LazyimgProps: Omit<ILazyimgType, keyof ILazyimgProps | 'src'> & { src?: string } = {
    ref: elementRef,
    key: ID,
    ...restProps,
  };

  const generateNonImgElement = (trimLazyimgProps?: typeof LazyimgProps) => {
    const height = LazyimgProps.height ? LazyimgProps.height : undefined;
    const width = LazyimgProps.width ? LazyimgProps.width : undefined;
    // 确保用户指定的 style 权重最大
    LazyimgProps.style = {
      ...{ height, width },
      ...{ backgroundImage: `url('${src}')`, backgroundSize: height && width ? `${width}px ${height}px` : undefined },
      ...LazyimgProps.style,
    };
    // 删除 height、width
    LazyimgProps.height = undefined;
    LazyimgProps.width = undefined;
    return createElement(element, { ...LazyimgProps, ...trimLazyimgProps }, children);
  };

  if (isLoaded || force) {
    if (isLazyimgWrapper && !animated && !force) {
      return createElement(
        Fragment,
        null,
        cloneElement(currentReactElement.current as ReactElement, {
          key: `ph-${ID}`,
          style: { position: 'absolute', top: 0, left: 0, ...(currentReactElement.current as ReactElement).props.style },
        }),
        // 原元素，去掉ref
        element === 'img'
          ? createElement(element, { ...LazyimgProps, ...{ src, srcSet: srcSet ? srcSet : undefined, ref: undefined } }, children)
          : generateNonImgElement({ ref: undefined })
      );
    }
    if (element === 'img') {
      LazyimgProps.src = src;
      if (srcSet !== undefined) {
        LazyimgProps.srcSet = srcSet;
      }
      currentReactElement.current = createElement(element, LazyimgProps, children);
    } else {
      currentReactElement.current = generateNonImgElement();
    }
  } else {
    if (isValidElement(placeholder)) {
      // 构建容器
      const style = {
        display: 'inline-block',
        height: LazyimgProps.height ? LazyimgProps.height : undefined,
        width: LazyimgProps.width ? LazyimgProps.width : undefined,
      } as CSSProperties;
      // 因为无法确保获取 placeholder 组件 ref，所以需要构建 'div' 包裹
      currentReactElement.current = createElement('div', {
        ...LazyimgProps,
        style: { ...style, ...(placeholder as ReactElement).props.wrapperStyle },
      }, cloneElement(placeholder as ReactElement))

      // return cloneElement(placeholder as ReactElement, {...LazyimgProps, style: { ...style, ...(placeholder as ReactElement).props.style } });
    } else {
      if (element === 'img') {
        LazyimgProps.src = placeholder as string;
      } else {
        if (LazyimgProps.style) {
          LazyimgProps.style = {...LazyimgProps.style, ...{backgroundImage: `url('${placeholder}')`}};
          // LazyimgProps.style.backgroundImage = `url('${placeholder}')`;
        }
      }
      currentReactElement.current = createElement(element, LazyimgProps, children);
    }
  }

  return currentReactElement.current;
};


  return Lazyimg;
}

export const LazyimgWrapper: FC<
  HTMLProps<HTMLElement> & {
    element?: string;
  }
> = ({ element = 'div', children, style, ...restProps }) => {
  let cloneChildren = Children.only(children);
  if (!!children) {
    cloneChildren = cloneElement(cloneChildren as ReactElement, { isLazyimgWrapper: true });
  }
  return createElement(element, { style: { position: 'relative', ...style }, ...restProps }, cloneChildren);
};

export default withLazyimg();
