import React, {Component} from 'react';
import './style.scss';
import Prism from '../Prism';
import Lazyimg, {LazyimgWrapper, withLazyimg} from '../../../../lib/Lazyimg';
import {getImg, getRImg} from '../../utils';
import Title from '../Title';
import Placeholder from '../Placeholder';
import Loading from '../../img/loading.svg';
import Fire from '../../img/fire.svg';
import I from '../I';

const Lazy = withLazyimg({
  placeholder: <Placeholder img={Loading} />,
  threshold: 0.98,
});

const AnimateLazy = withLazyimg({
  placeholder: <Placeholder img={Loading} />,
  timeout: 1000,
  threshold: 0.98,
});

class Example extends Component {
  render() {
    return (
      <div className="example">
        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="默认配置" className="sub" />
          <div className="example-img">
            <Lazyimg className="lazy" src={getImg()} width="100%" height="100%" threshold={1} />
          </div>
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg from 'react-lazyimg-component';
  // 调用
  <Lazyimg 
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title={`使用 "LazyimgWrapper" 开启渐进性过渡效果`} className="sub" />
          <div className="example-img">
            <LazyimgWrapper style={{height: '100%', width: '100%'}}>
              <Lazyimg className="lazy" src={getImg()} threshold={0.98} />
            </LazyimgWrapper>
          </div>
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg, { LazyimgWrapper } from 'react-lazyimg-component';
  <LazyimgWrapper>
    <Lazyimg 
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
    />
  </LazyimgWrapper>
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="placeholder 组件" className="sub" />
          <div className="example-img">
            <Lazyimg
              className="lazy"
              placeholder={<Placeholder img={Fire} />}
              src={getImg()}
              animateType="animation"
              animateClassName={['animated', 'rollIn']}
              timeout={1000}
            />
          </div>
          <I className="i">
            提示：如果普通的<strong className="strong">placeholder</strong>图片不能满足你，可以定制一个 react
            placeholder 组件哦😝
          </I>
          <Prism>
            {`
  // 定义 placeholder 组件
  import React from 'react';
  import './style.scss';
  export default props => {
    let { className, text, img, children } = props;
    return (
      <div
        className={['placeholder', className]
          .filter(item => {
            if (item) {
              return item;
            }
          })
          .join(' ')}
      >
      { img && <img src={img} className="placeholder-img" />}
      { text && <span className="placeholder-text" >{children || text}</span> }
      </div>
    );
  };

  // 引入 react-lazyimg-component
  import Lazyimg from 'react-lazyimg-component';
  // 引入 Placeholder
  import Placeholder from './Placeholder';
  // 引入 fire.svg
  import Fire from './img/fire.svg';

  <Lazyimg
    placeholder={<Placeholder img={Fire} />}
    animateType="animation"
    animateClassName={['animated', 'rollIn']}
    className="lazy"
    timeout={1000}
    src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
  />
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title={`使用 "withLazying" 配置 react 组件式 placeholder`} className="sub" />
          <div className="example-img">
            <LazyimgWrapper style={{height: '100%', width: '100%'}}>
              <Lazy className="lazy" src={getImg()} />
            </LazyimgWrapper>
          </div>
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg, { LazyimgWrapper, withLazyimg } from 'react-lazyimg-component';
  // 引入 Placeholder
  import Placeholder from './Placeholder';
  // 引入 loading.svg
  import Loading from './img/loading.svg';
  // 使用 withLazyimg 配置
  const Lazy = withLazyimg({
    placeholder: <Placeholder img={Loading} />,
    threshold:0.98,
  });
  <LazyimgWrapper style={{height: "100%", width: "100%"}}>
    <Lazy 
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
    />
  </LazyimgWrapper>
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="transition 动画效果" className="sub" />
          <div className="example-img">
            <Lazy
              animateType="transition"
              animateClassName={['transition-enter', 'transition-enter-active']}
              className="lazy"
              src={getImg()}
            />
          </div>
          <I className="i-error">
            注意：这里 <strong className="strong key">"transition"</strong> 使用的是{' '}
            <strong className="strong">{'进动画（不可见 ---> 可见）'}</strong>。如果使用{' '}
            <strong className="strong key">"LazyimgWrapper"</strong>，就需要使用
            <strong className="strong">{'出动画（可见 ---> 不可见）'}</strong>。同时需要指定 <strong className="code">{`timeout={400}`}</strong>
          </I>
          <Prism>
            {`
  // transition css
  .transition-enter {
    opacity: 0;
    transform: scale(1.04);
  }

  .transition-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 400ms, transform 400ms;
  }
            `}
          </Prism>
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg from 'react-lazyimg-component';

  <Lazyimg
    animateType="transition"
    animateClassName={['transition-enter', 'transition-enter-active']}
    className="lazy"
    timeout={300}
    src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
  />
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="animate.css 动画效果" className="sub" />
          <div className="example-img">
            <LazyimgWrapper style={{height: '100%', width: '100%'}}>
              <Lazy
                animateType="animation"
                animateClassName={['animated', 'slideOutDown']}
                className="lazy"
                src={getImg()}
              />
            </LazyimgWrapper>
          </div>
          <I className="i-error">
            注意：这里 <strong className="strong key">"animation"</strong> 依赖于
            <a className="strong link" href="https://github.com/daneden/animate.css" target="blank">
              animate.css
            </a>
            ， 并且使用了 <strong className="strong key">"LazyimgWrapper"</strong>，就需要使用
            <strong className="strong">{'出动画（可见 ---> 不可见）'}</strong>，如 <strong>"slideOutDown"</strong>。同时需要指定 <strong className="code">{`timeout={1000}`}</strong>
          </I>。
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg, { LazyimgWrapper, withLazyimg } from 'react-lazyimg-component';
  // 引入 Placeholder
  import Placeholder from '../Placeholder';
  // 引入 loading.svg
  import Loading from '../../img/loading.svg';
  // 使用 withLazyimg 配置
  const Lazy = withLazyimg({
    placeholder: <Placeholder img={Loading} />,
    threshold:0.98
  });
  <LazyimgWrapper style={{height: "100%", width: "100%"}}>
    <Lazy 
      animateType="animation"
      animateClassName={["animated","slideOutDown"]}
      timeout={1000}
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
    />
  </LazyimgWrapper>
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="基于 loaded 钩子函数自定义动画效果" className="sub" />
          <div className="example-img">
            <Lazyimg
              className="lazy"
              src={getImg()}
              loaded={(el) => {
                window.Velocity(el, 'transition.whirlIn', {
                  duration: 600,
                });
                return true;
              }}
            />
          </div>
          <I className="i">
            提示：如果
            <a className="link strong" href="https://github.com/daneden/animate.css" target="blank">
              {' '}
              animate.css
            </a>
            和
            <a className="link strong" href="https://github.com/julianshapiro/velocity" target="blank">
              velocity.js
            </a>
            动画库都不满足你的需求。可以基于<strong className="strong key">"loaded"</strong> 配置项自定义动画效果。另外，需要确保
            <strong className="strong key">"loaded"</strong> 返回值为<strong className="code">"return true;"</strong>
            ，这样可以<strong>避免执行默认动画逻辑</strong>。
          </I>
          <Prism>
            {`
  // 引入 react-lazyimg-component
  import Lazyimg from 'react-lazyimg-component';
  // 调用
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    loaded={(el)=>{ // 自定义动画效果
      window.Velocity(el, 'transition.whirlIn', { // 需要引入 Velocity 动画库
        duration: 600,
      });
      // 避免执行默认动画逻辑
      return true;
    }}
  />
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="父级动画效果" className="sub" />
          <div className="example-img">
            <Lazy
              className="lazy"
              src={getImg()}
              parent={2}
              animateType="animation"
              animateClassName={['animated', 'flipInY']}
            />
          </div>
          <I className="i-desc">当图片元素加载完，动画效果会作用在指定的父级元素上。</I>
          <Prism>
            {`
  <div className="example-wp"> // 指定动画效果作用于该父级元素
    <Title title="父级动画效果" className="sub" />
    <div className="example-img">
      <Lazyimg
        className="lazy"
        src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
        animateType="animation"
        animateClassName={['animated', 'flipInY']}
        timeout={1000}
        parent=".example-wp" // 指定父级元素选择器，也可以指定父级层级level：2
      />
    </div>
  </div>
            `}
          </Prism>
        </div>

        {/* ------------------------------------- 分割线 ----------------------------------- */}
        <div className="example-wp">
          <Title title="响应式图片( picture / srcset )" className="sub" />
          {/* ---------- srcset -------- */}
          <div className="example-img">
            <AnimateLazy
              className="lazy"
              src={getImg()}
              srcSet={`${getRImg()} 1x, ${getRImg()} 2x, ${getRImg()} 3x`}
              animateType="animation"
              animateClassName={['animated', 'bounceIn']}
            />
          </div>
          <I className="i-desc">
            响应式图片：<strong className="strong">srcSet</strong>的使用
          </I>
          <Prism>
            {`
  // dpr
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    srcSet="source_1x.png 1x, source_2x.png 2x, source_3x.png 3x, source_3.5x.png 3.5x"
    timeout={1000}
    animateType="animation"
    animateClassName={['animated', 'bounceIn']}
  />
            `}
          </Prism>

          {/* ------------------------------------- 分割线 ----------------------------------- */}
          <div className="example-img">
            <Lazy
              className="lazy"
              src={getImg()}
              srcSet={`${getRImg()} 360w, ${getRImg()} 640w, ${getRImg()} 980w`}
              sizes="(max-width: 370px) 90vw, (max-width: 640px) 100vw,(max-width: 980px) 100vw, 1300"
              animateType="animation"
              animateClassName={['animated', 'bounceIn']}
            />
          </div>
          <I className="i-desc">
            响应式图片：<strong className="strong">srcSet</strong>和<strong className="strong">sizes</strong>的使用
          </I>
          <Prism>
            {`
// media-query、srcSet、sizes
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    srcSet="source_360.png 360w, source_640.png 640w, source_980.png 980w, source_1290.png 1290w"
    sizes="(min-width: 370px) 100vw, (min-width: 640px) 75vw,(max-width: 980px) 50vw, 360"
    timeout={1000}
    animateType="animation"
    animateClassName={['animated', 'bounceIn']}
  />
            `}
          </Prism>
          {/* ---------- picture -------- */}
          <div className="example-img">
            <picture style={{position: 'relative', display: 'block', height: '100%'}}>
              <source media="(min-width: 650px)" srcSet={getRImg()} />
              <source media="(min-width: 465px)" srcSet={getRImg()} />
              <AnimateLazy className="lazy" src={getImg()} animateType="animation" animateClassName={['animated', 'zoomIn']} />
            </picture>
          </div>
          <I className="i-desc">
            响应式图片：<strong className="strong">picture</strong>的使用
          </I>
          <Prism>
            {`
  <picture>
      <source media="(min-width: 650px)" srcSet="https://www.w3schools.com/tags/img_pink_flowers.jpg" />
      <source media="(min-width: 465px)" srcSet="https://www.w3schools.com/tags/img_white_flower.jpg"/>
      <Lazyimg
        className="lazy"
        src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
        timeout={1000}
        animateType="animation"
        animateClassName={['animated', 'zoomIn']}
    />
  </picture>
            `}
          </Prism>
        </div>
      </div>
    );
  }
}
export default Example;
