"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parents = exports.parentLevel = exports.animate = exports.appendStyle = void 0;
var whichEvent = (function () {
    if (typeof window === 'undefined') {
        return {};
    }
    var tempElement = document.createElement('b');
    var EVENTS = [
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
    var result = Object.create(null);
    EVENTS.forEach(function (items, index) {
        Object.keys(items).forEach(function (currentValue) {
            tempElement.style[currentValue] !== undefined
                ? (result[index === 0 ? 'transition' : 'animation'] = items[currentValue])
                : undefined;
        });
    });
    return result;
})();
function appendStyle(styleText, id) {
    if (document.head.querySelector('#lazyimg')) {
        return;
    }
    var styleElement = document.createElement('style');
    styleElement.id = id || 'lazyimg';
    document.head.appendChild(styleElement);
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styleText));
}
exports.appendStyle = appendStyle;
function animate(type, element, animateClassName, timeout, endCallback) {
    var _a;
    if (element === undefined || animateClassName === undefined || timeout === undefined) {
        throw new Error("[react-lazyimg] " + (element === undefined ? 'element' : '') + (animateClassName === undefined ? 'animateClassName' : '') + (timeout === undefined ? 'timeout' : '') + " parameter is required.");
    }
    var event = whichEvent[type];
    var addEventListener = function () {
        var detach = function () {
            var _a;
            (_a = element.classList).remove.apply(_a, animateClassName);
            endCallback(element);
        };
        if (!event) {
            var fallback = function () {
                setTimeout(function () {
                    detach();
                }, timeout);
            };
            fallback();
            return;
        }
        var cb = function () {
            detach();
            element.removeEventListener(event, cb, false);
        };
        element.addEventListener(event, cb, false);
    };
    if (type === 'transition') {
        element.classList.add(animateClassName[0]);
        element.scrollTop;
        element.classList.add(animateClassName[1]);
    }
    else {
        var tempAnimationName = animateClassName;
        if (!Array.isArray(animateClassName)) {
            tempAnimationName = [animateClassName];
        }
        (_a = element.classList).add.apply(_a, tempAnimationName);
    }
    addEventListener();
}
exports.animate = animate;
function parentLevel(el, level) {
    var current = el;
    while (level) {
        current = current.parentNode;
        if (current.nodeType === 9) {
            return null;
        }
        --level;
    }
    return current;
}
exports.parentLevel = parentLevel;
function parents(el, selector) {
    var next = el.parentNode;
    if (next.nodeType === 9) {
        return null;
    }
    if (Array.prototype.slice.call(document.querySelectorAll(selector), 0).some(function (item) {
        return item === next;
    })) {
        return next;
    }
    else {
        return parents(next, selector);
    }
}
exports.parents = parents;
