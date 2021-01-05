import React, { FC, HTMLProps } from 'react';
import 'intersection-observer';
export declare const ID: string;
export interface ILazyimgProps {
    element?: string;
    force?: boolean;
    loaded?: (el?: HTMLElement) => void;
    end?: (el?: HTMLElement) => void;
    isLazyimgWrapper?: boolean;
    animateType?: 'none' | 'transition' | 'animation';
    animateClassName?: string[];
    timeout?: number;
    parent?: number | string;
    placeholder?: React.ReactNode;
    root?: Element;
    rootMargin?: string;
    threshold?: number[];
}
interface ILazyimgType extends Omit<HTMLProps<HTMLElement>, 'placeholder'>, ILazyimgProps {
    src: string;
    srcSet?: string;
}
declare const Lazyimg: FC<ILazyimgType>;
export declare const LazyimgWrapper: FC<HTMLProps<HTMLElement> & {
    element?: string;
}>;
export default Lazyimg;
