"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyimgWrapper = exports.withLazyimg = exports.ID = void 0;
var react_1 = require("react");
require("intersection-observer");
var Util_1 = require("./Util");
exports.ID = Date.now() + '';
var withLazyimg = function (config) {
    if (config === void 0) { config = {}; }
    var Lazyimg = function (props) {
        var defaults = {
            force: false,
            element: 'img',
            placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
            animateType: 'transition',
            isLazyimgWrapper: false,
            timeout: 300,
            root: null,
            rootMargin: '0px',
            threshold: 0,
            loaded: function () { },
            end: function () { },
        };
        var finalProps = __assign(__assign(__assign({}, defaults), config), props);
        var force = finalProps.force, element = finalProps.element, placeholder = finalProps.placeholder, animateType = finalProps.animateType, animateClassName = finalProps.animateClassName, isLazyimgWrapper = finalProps.isLazyimgWrapper, timeout = finalProps.timeout, parent = finalProps.parent, src = finalProps.src, srcSet = finalProps.srcSet, root = finalProps.root, rootMargin = finalProps.rootMargin, threshold = finalProps.threshold, children = finalProps.children, _a = finalProps.loaded, loaded = _a === void 0 ? function () { } : _a, _b = finalProps.end, end = _b === void 0 ? function () { } : _b, restProps = __rest(finalProps, ["force", "element", "placeholder", "animateType", "animateClassName", "isLazyimgWrapper", "timeout", "parent", "src", "srcSet", "root", "rootMargin", "threshold", "children", "loaded", "end"]);
        var elementRef = react_1.useRef(null);
        var currentReactElement = react_1.useRef(null);
        var contextRef = react_1.useRef({ isLoaded: false });
        var _c = react_1.useState(false), animated = _c[0], setAnimated = _c[1];
        var _d = react_1.useState(false), isLoaded = _d[0], setIsLoaded = _d[1];
        if (animateType === 'transition' && animateClassName === undefined) {
            animateClassName = ["lazyimg-enter", "lazyimg-enter-active"];
            Util_1.appendStyle("\n      .lazyimg-exit {\n        opacity: 0.9;\n      }\n      .lazyimg-exit-active {\n        opacity: 0;\n        transition: opacity 300ms;\n      }\n      .lazyimg-enter {\n        opacity: 0.1;\n      }\n      .lazyimg-enter-active {\n        opacity: 1;\n        transition: opacity 300ms;\n      }\n    ");
            if (isLazyimgWrapper && !animated) {
                animateClassName = ["lazyimg-exit", "lazyimg-exit-active"];
            }
        }
        if (isLazyimgWrapper && !animated) {
            var endCallback_1 = end;
            end = function (el) {
                endCallback_1(el);
                setAnimated(true);
            };
        }
        var proxyImg = function (src, srcSet) {
            var proxy = new Image();
            proxy.src = src;
            if (srcSet !== undefined) {
                proxy.srcset = srcSet;
            }
            proxy.onload = function () {
                setIsLoaded(true);
                contextRef.current.isLoaded = true;
            };
            proxy.onerror = function () {
                setIsLoaded(false);
                contextRef.current.isLoaded = false;
            };
        };
        react_1.useEffect(function () {
            if (!elementRef.current || force) {
                return;
            }
            if (contextRef.current.isLoaded) {
                if (typeof loaded === 'function') {
                    var isSkip = loaded(elementRef.current);
                    if (isSkip) {
                        return;
                    }
                }
                var animateElement = elementRef.current;
                if (parent !== undefined) {
                    if (isLazyimgWrapper) {
                        console.warn('[Lazyimg] ⚠️ "parent" property invalid, as "isLazyimgWrapper" property takes a priority over "parent" property. if you need "parent" property, able to turn "isLazyimgWrapper" property off.');
                    }
                    else {
                        if (typeof parent === 'number') {
                            animateElement = Util_1.parentLevel(elementRef.current, parent) || elementRef.current;
                        }
                        else {
                            animateElement = Util_1.parents(elementRef.current, parent) || elementRef.current;
                        }
                    }
                }
                animateType !== 'none' && Util_1.animate(animateType, animateElement, animateClassName, timeout, end);
            }
        }, [isLoaded]);
        react_1.useEffect(function () {
            if (animated) {
                end(elementRef.current);
            }
        }, [animated, end]);
        react_1.useEffect(function () {
            if (force) {
                return;
            }
            var observer = new IntersectionObserver(function (_a) {
                var entry = _a[0];
                if (entry.isIntersecting) {
                    if (elementRef.current !== null) {
                        proxyImg(src, srcSet);
                        observer.unobserve(elementRef.current);
                        observer.disconnect();
                    }
                }
            }, {
                root: root,
                rootMargin: rootMargin,
                threshold: threshold,
            });
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
            return function () {
                observer.disconnect();
            };
        }, [src]);
        var LazyimgProps = __assign({ ref: elementRef, key: exports.ID }, restProps);
        var generateNonImgElement = function (trimLazyimgProps) {
            var height = LazyimgProps.height ? LazyimgProps.height : undefined;
            var width = LazyimgProps.width ? LazyimgProps.width : undefined;
            LazyimgProps.style = __assign(__assign({ height: height, width: width }, { backgroundImage: "url('" + src + "')", backgroundSize: height && width ? width + "px " + height + "px" : undefined }), LazyimgProps.style);
            LazyimgProps.height = undefined;
            LazyimgProps.width = undefined;
            return react_1.createElement(element, __assign(__assign({}, LazyimgProps), trimLazyimgProps), children);
        };
        if (isLoaded || force) {
            if (isLazyimgWrapper && !animated && !force) {
                return react_1.createElement(react_1.Fragment, null, react_1.cloneElement(currentReactElement.current, {
                    key: "ph-" + exports.ID,
                    style: __assign({ position: 'absolute', top: 0, left: 0 }, currentReactElement.current.props.style),
                }), element === 'img'
                    ? react_1.createElement(element, __assign(__assign({}, LazyimgProps), { src: src, srcSet: srcSet ? srcSet : undefined, ref: undefined }), children)
                    : generateNonImgElement({ ref: undefined }));
            }
            if (element === 'img') {
                LazyimgProps.src = src;
                if (srcSet !== undefined) {
                    LazyimgProps.srcSet = srcSet;
                }
                currentReactElement.current = react_1.createElement(element, LazyimgProps, children);
            }
            else {
                currentReactElement.current = generateNonImgElement();
            }
        }
        else {
            if (react_1.isValidElement(placeholder)) {
                var style = {
                    display: 'inline-block',
                    height: LazyimgProps.height ? LazyimgProps.height : undefined,
                    width: LazyimgProps.width ? LazyimgProps.width : undefined,
                };
                currentReactElement.current = react_1.createElement('div', __assign(__assign({}, LazyimgProps), { style: __assign(__assign({}, style), placeholder.props.wrapperStyle) }), react_1.cloneElement(placeholder));
            }
            else {
                if (element === 'img') {
                    LazyimgProps.src = placeholder;
                }
                else {
                    if (LazyimgProps.style) {
                        LazyimgProps.style = __assign(__assign({}, LazyimgProps.style), { backgroundImage: "url('" + placeholder + "')" });
                    }
                }
                currentReactElement.current = react_1.createElement(element, LazyimgProps, children);
            }
        }
        return currentReactElement.current;
    };
    return Lazyimg;
};
exports.withLazyimg = withLazyimg;
var LazyimgWrapper = function (_a) {
    var _b = _a.element, element = _b === void 0 ? 'div' : _b, children = _a.children, style = _a.style, restProps = __rest(_a, ["element", "children", "style"]);
    var cloneChildren = react_1.Children.only(children);
    if (!!children) {
        cloneChildren = react_1.cloneElement(cloneChildren, { isLazyimgWrapper: true });
    }
    return react_1.createElement(element, __assign({ style: __assign({ position: 'relative' }, style) }, restProps), cloneChildren);
};
exports.LazyimgWrapper = LazyimgWrapper;
exports.default = exports.withLazyimg();
