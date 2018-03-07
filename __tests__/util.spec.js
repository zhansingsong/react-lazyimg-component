import Util from '../src/util';
import React, { Component } from 'react';
import { mount } from 'enzyme';

test('isVisible utility', () => {
  let fakeElement = {
    offsetWidth: undefined,
    offsetHeight: undefined,
    getClientRects: () => {
      return { length: 0 };
    },
  };
  expect(Util.isVisible(fakeElement)).toBeFalsy();
  fakeElement.offsetHeight = 120;
  expect(Util.isVisible(fakeElement)).toBeTruthy();
  fakeElement.offsetHeight = undefined;
  fakeElement.getClientRects = () => {
    return { length: 1 };
  };
  expect(Util.isVisible(fakeElement)).toBeTruthy();
});

test('filterProps utility', () => {
  let fakeProps = {
    className: 'test',
    src: 'source.png',
  };
  expect(Util.filterProps(fakeProps)).toEqual({
    configProps: { src: 'source.png' },
    originalProps: { className: 'test' },
  });
});

test('uid utility', () => {
  expect(Util.uid()).toMatch(
    /[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-4[A-Fa-f0-9]{3}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{8}/g,
  );
});

test('toDash utility', () => {
  expect(Util.toDash('lazyImg')).toBe('lazy-img');
});

test('obj2Style utility', () => {
  let fakeStyle = { fontSize: '16px', color: '#333' };
  expect(Util.obj2Style(fakeStyle)).toBe('font-size:16px;color:#333');
});

test('throttle utility', done => {
  const mockCallback = jest.fn();
  const callback = () => {
    mockCallback();
    expect(mockCallback.mock.calls.length).toBe(1);
    done();
  };
  Util.throttle(callback, 100)();
});

test('isExistImage utility', () => {
  expect(Util.isExistImage([{ src: 'lazyimg.png' }], 'lazyimg.png')).toEqual({
    src: 'lazyimg.png',
  });
});

test('isArray utility', () => {
  expect(Util.isArray([])).toBeTruthy();
  expect(Util.isArray({})).toBeFalsy();
});

test('isNumber utility', () => {
  expect(Util.isNumber(1)).toBeTruthy();
  expect(Util.isNumber('22')).toBeFalsy();
});

test('toArray utility', () => {
  let fakeArr = [1];
  fakeArr.lazyimg = 'lazyimg';
  expect(fakeArr.lazyimg).toBe('lazyimg');
  expect(Util.toArray(fakeArr).lazyimg).toBeUndefined();
});

test('parentLevel utility', () => {
  let fakeElement = {
    level: 0,
    parentNode: {
      level: 1,
      parentNode: {
        level: 2,
        nodeType: 9,
      },
    },
  };
  expect(Util.parentLevel(fakeElement, 1)).toEqual({
    level: 1,
    parentNode: {
      level: 2,
      nodeType: 9,
    },
  });
  expect(Util.parentLevel(fakeElement, 2)).toBeNull();
});

test('parents utility', () => {
  let fakeElement = {
    parentNode: {
      querySelectorAll: selector => {
        return selector === 'lazyimg' ? [fakeElement] : [];
      },
      parentNode: {
        nodeType: 9,
      },
    },
  };
  expect(Util.parents(fakeElement, 'lazyimg')).toEqual(fakeElement.parentNode);
  expect(Util.parents(fakeElement, 'test')).toBeNull();
});

const window = {
  innerHeight: 1000,
  innerWidth: 1920,
};
let fakeContainer = {
  innerHeight: 1000,
  innerWidth: 1920,
  getBoundingClientRect: () => {
    return {
      bottom: 1000,
      height: 1000,
      left: 0,
      right: 1920,
      top: 0,
      width: 1920,
      x: 0,
      y: 0,
    };
  },
};

test('belowTheViewport utility', () => {
  let fakeElement = {
    getBoundingClientRect: () => {
      return {
        bottom: 1600,
        height: 700,
        left: 100,
        right: 400,
        top: 1200,
        width: 400,
        x: 0,
        y: 0,
      };
    },
  };
  let fakeSettings = {
    container: fakeContainer,
    threshold: 0,
  };
  expect(Util.belowTheViewport(fakeElement, fakeSettings)).toBeTruthy;
  fakeSettings.threshold = 200;
  expect(Util.belowTheViewport(fakeElement, fakeSettings)).toBeFalsy;
});

test('rightOfViewport utility', () => {
  let fakeElement = {
    getBoundingClientRect: () => {
      return {
        bottom: 1600,
        height: 700,
        left: 2000,
        right: 2400,
        top: 1200,
        width: 400,
        x: 0,
        y: 0,
      };
    },
  };
  let fakeSettings = {
    container: fakeContainer,
    threshold: 0,
  };
  expect(Util.rightOfViewport(fakeElement, fakeSettings)).toBeTruthy;
  fakeSettings.threshold = 400;
  expect(Util.rightOfViewport(fakeElement, fakeSettings)).toBeFalsy;
});

test('aboveTheViewport utility', () => {
  let fakeElement = {
    getBoundingClientRect: () => {
      return {
        bottom: 600,
        height: 500,
        left: 2000,
        right: 2400,
        top: 100,
        width: 400,
        x: 0,
        y: 0,
      };
    },
  };
  let fakeSettings = {
    container: fakeContainer,
    threshold: 0,
  };
  expect(Util.aboveTheViewport(fakeElement, fakeSettings)).toBeTruthy;
  fakeSettings.threshold = 600;
  expect(Util.aboveTheViewport(fakeElement, fakeSettings)).toBeFalsy;
});

test('leftOfViewport utility', () => {
  const mockCallback = jest.fn();
  let fakeElement = {
    getBoundingClientRect: () => {
      return {
        bottom: 600,
        height: 500,
        left: 800,
        right: 200,
        top: 100,
        width: 600,
        x: 0,
        y: 0,
      };
    },
  };
  let fakeSettings = {
    container: fakeContainer,
    threshold: 0,
  };
  expect(Util.leftOfViewport(fakeElement, fakeSettings)).toBeTruthy;
  fakeSettings.threshold = 1600;
  expect(Util.leftOfViewport(fakeElement, fakeSettings)).toBeFalsy;
});

test('inTheViewport utility', () => {
  let fakeElement = {
    getBoundingClientRect: () => {
      return {
        bottom: 600,
        height: 500,
        left: 800,
        right: 200,
        top: 100,
        width: 600,
        x: 0,
        y: 0,
      };
    },
  };
  let fakeSettings = {
    container: fakeContainer,
    threshold: 0,
  };
  expect(Util.inTheViewport(fakeElement, fakeSettings)).toBeTruthy;
  fakeSettings.threshold = 1600;
  expect(Util.inTheViewport(fakeElement, fakeSettings)).toBeFalsy;
});

test('onAnimatedEnd utility', () => {
  const mockCallback = jest.fn();
  let fakeElement = {
    classList: {
      add: () => {
        mockCallback();
      },
      remove: () => {
        mockCallback();
      },
    },
    addEventListener: (event, cb) => {
      cb();
      expect(mockCallback.mock.calls.length).toBe(3);
    },
    removeEventListener: () => {
      mockCallback();
    },
  };

  try {
    expect(Util.onAnimatedEnd(undefined)).toThrow();
    expect(Util.onAnimatedEnd(undefined, undefined)).toThrow();
    expect(Util.onAnimatedEnd(fakeElement, 'lazyimg')).toThrow();
  } catch (error) {}
  Util.onAnimatedEnd(fakeElement, 'lazyimg', () => {}, 'animationend');
});
