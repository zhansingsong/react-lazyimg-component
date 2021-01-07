import { ILazyimgProps } from './Lazyimg';
export declare function appendStyle(styleText: string, id?: string): void;
export declare function animate(type: string, element: HTMLElement, animateClassName: NonNullable<ILazyimgProps['animateClassName']>, timeout: NonNullable<ILazyimgProps['timeout']>, endCallback: NonNullable<ILazyimgProps['end']>): void;
export declare function parentLevel(el: HTMLElement, level: number): HTMLElement | null;
export declare function parents(el: HTMLElement, selector: string): any;
