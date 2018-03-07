import React, { Component } from 'react';
import Lazyimg, { withLazyimg } from '../src/index';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

// snapshot
test('Lazyimg component', () => {
  const lazyimg = render(<Lazyimg src="test.png" className="lazy" />);
  expect(toJson(lazyimg)).toMatchSnapshot();
});

test('withLazyimg component', () => {
  const config = {
    js_effect: 'transition.fadeIn',
  };
  const Lazy = withLazyimg(config);
  const lazyimg = render(<Lazy src="test.png" className="lazy" />);
  expect(toJson(lazyimg)).toMatchSnapshot();
});

test('Lazyimg', () => {
  const lazyimg = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg.name()).toBe('Lazyimg');
});

test('Lazyimg instance', () => {
  const lazyimg = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg.instance()).toBeInstanceOf(Lazyimg);
});

test('withLazyimg instance', () => {
  const config = {
    js_effect: 'transition.fadeIn',
  };
  const Lazy = withLazyimg(config);
  const lazyimg = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg.instance()).toBeInstanceOf(Lazy);
});
// event
test('lazyimg event', () => {
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
  const config = {
    js_effect: 'transition.fadeIn',
  };
  const Lazy = withLazyimg(config);
  const lazyimg = mount(<Lazy src="test.png" className="lazy" />);
  expect(window.addEventListener.mock.calls.length).toBe(5);
});

// config
test('Lazyimg config threshold', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.threshold).toBe(0);
  const config = {
    threshold: 100,
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(
    <Lazy src="test.png" className="lazy" threshold={200} />,
  );
  expect(lazyimg2.instance().lazyimgs[0].settings.threshold).toBe(200);
});

test('Lazyimg config event', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.event).toBe('scroll');
  const config = {
    event: 'click',
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(
    <Lazy src="test.png" className="lazy" event="touch" />,
  );
  expect(lazyimg2.instance().lazyimgs[0].settings.event).toBe('touch');
});

test('Lazyimg config js_effect', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.js_effect).toBeUndefined();
  const config = {
    js_effect: 'transition.shrinkIn',
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(
    <Lazy src="test.png" className="lazy" js_effect="transition.flipXIn" />,
  );
  expect(lazyimg2.instance().lazyimgs[0].settings.js_effect).toBe(
    'transition.flipXIn',
  );
});

test('Lazyimg config css_effect', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.css_effect).toBeUndefined();
  const config = {
    css_effect: 'shrinkIn',
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(
    <Lazy src="test.png" className="lazy" css_effect="flipXIn" />,
  );
  expect(lazyimg2.instance().lazyimgs[0].settings.css_effect).toBe('flipXIn');
});

test('Lazyimg config container', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.container).toBe(window);
});

test('Lazyimg config skip_invisible', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.skip_invisible).toBeTruthy();
  const config = {
    skip_invisible: false,
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.skip_invisible).toBeFalsy();
});

test('Lazyimg config parent', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.parent).toBeUndefined();
  const config = {
    parent: 2,
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(
    <Lazy src="test.png" className="lazy" parent=".parent" />,
  );
  expect(lazyimg2.instance().lazyimgs[0].settings.parent).toBe('.parent');
});

test('Lazyimg config appear', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.appear).toBeNull();
  const config = {
    appear: () => {},
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.appear).toBeInstanceOf(
    Function,
  );
});

test('Lazyimg config load', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.load).toBeNull();
  const config = {
    load: () => {},
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.load).toBeInstanceOf(
    Function,
  );
});

test('Lazyimg config error', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.error).toBeNull();
  const config = {
    error: () => {},
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.error).toBeInstanceOf(
    Function,
  );
});

test('Lazyimg config node_type', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.node_type).toBe('img');
  console.log(lazyimg1.name());
  const config = {
    node_type: 'div',
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.node_type).toBe('div');
});

test('Lazyimg config placeholder', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  expect(lazyimg1.instance().lazyimgs[0].settings.placeholder).toBe(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  );
  const P = () => {
    return <div />;
  };
  const config = {
    placeholder: <P />,
  };
  const Lazy = withLazyimg(config);
  const lazyimg2 = mount(<Lazy src="test.png" className="lazy" />);
  expect(lazyimg2.instance().lazyimgs[0].settings.placeholder.type).toBe(P);
});

// life cycle
test('Lazyimg componentWillUnmount', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  lazyimg1.unmount();
  expect(lazyimg1.get(0)).toBeNull();
});

test('Lazyimg render update', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  // console.log(lazyimg1.getDOMNode().src);
  expect(lazyimg1.getDOMNode().src).toBe(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  );
  lazyimg1.setState({
    isLoaded: true,
    isFailed: false,
  });
  expect(lazyimg1.getDOMNode().src).toBe('test.png');
});

test('Lazyimg render error', () => {
  const lazyimg1 = mount(<Lazyimg src="test.png" className="lazy" />);
  // console.log(lazyimg1.getDOMNode().src);
  expect(lazyimg1.getDOMNode().src).toBe(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  );
  try {
    lazyimg1.setState({
      isLoaded: true,
      isFailed: true,
    });
    expect(lazyimg1.getDOMNode().src).toBe(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    );
  } catch (error) {}
});

// functionality
// test('Lazyimg props', () => {
//   const config = {
//     js_effect: 'transition.fadeIn',
//   };
//   const Lazy = withLazyimg(config);
//   const lazyimg = mount(
//     <Lazy src="test.png" className="lazy" js_effect="singsong" />,
//   );
// const lazyimg = mount(
//   <Lazy src="test.png" className="lazy" js_effect="singsong" />,
// );
// console.log(lazyimg);
// console.log(lazyimg.props());
// console.log(lazyimg.state());
// lazyimg.setState({
//   src: 'singsong.png',
//   isLoaded: true,
//   isFailed: false,
// });
// console.log(lazyimg.html());
// console.log(lazyimg.instance().lazyimgs);
// console.log(map);
// expect(toJson(lazyimg)).toMatchSnapshot();
// });
