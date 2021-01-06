import React, { FC, HTMLProps } from 'react';
import 'intersection-observer';
export declare const ID: string;
export interface ILazyimgProps {
    element?: string;
    force?: boolean;
    loaded?: (el?: HTMLElement) => void;
    end?: (el?: HTMLElement) => void;
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
    isLazyimgWrapper?: boolean;
}
export declare const withLazyimg: (config?: ILazyimgProps) => FC<ILazyimgType>;
export declare const LazyimgWrapper: FC<HTMLProps<HTMLElement> & {
    element?: string;
}>;
declare const _default: React.FC<ILazyimgType>;
export default _default;
