import React, { Component } from 'react';
import './style.scss';
import Prism from '../Prism';
import Lazyimg, { LazyimgWrapper, withLazyimg } from '../../../../lib/Lazyimg';
import { getImg, getRImg } from '../../utils';
import Title from '../Title';
import Placeholder from '../Placeholder';
import Loading from '../../img/loading.svg';
import I from '../I';
const Lazy = withLazyimg({
  placeholder: <Placeholder img={Loading} />,
  threshold:0.98
});
class Example extends Component {
  render() {
    return (
      <div className="example">
        {/* <div className="example-tt">
          <div className="example-tt-wp">
          <Title title="实例"/>
          </div>
        </div> */}
        <div className="example-wp">
          <Title title="默认配置" className="sub" />
          <div className="example-img">
            <Lazyimg
              className="lazy"
              src={getImg().default}
              width="100%"
              height="100%"
              threshold={1}
            />
          </div>

          <Prism>
            {`
  // 调用
  <Lazyimg 
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />
            `}
          </Prism>
        </div>

        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title={`使用 "LazyimgWrapper" 开启渐进性过渡效果`} className="sub" />
          <div className="example-img">
            <LazyimgWrapper style={{height: "100%", width: "100%"}}>
              <Lazyimg 
                className="lazy"
                src={getImg().default}
                threshold={0.98}
              />
            </LazyimgWrapper>
          </div>
          <Prism>
            {`
  // 引入 lazyimg 
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

        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="使用 withLazying 配置 react 组件式 placeholder" className="sub" />
          <div className="example-img">
          <LazyimgWrapper style={{height: "100%", width: "100%"}}>
              <Lazy 
                className="lazy"
                src={getImg().default}
              />
            </LazyimgWrapper>
          </div>
          <I>
            提示：这里是基于<strong className="strong">config 配置实例</strong>来做定制。现实不同的动画效果。
          </I>
          <Prism>
            {`
  import Lazyimg, { LazyimgWrapper, withLazyimg } from 'react-lazyimg-component';
  // 使用 withLazyimg 配置
  const Lazy = withLazyimg({
    placeholder: <Placeholder img={Loading} />,
    threshold:0.98
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
        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="animate.css 动画效果" className="sub" />
          <div className="example-img">
          <LazyimgWrapper style={{height: "100%", width: "100%"}}>
              <Lazy 
                animateType="animation"
                animateClassName={["animated","slideOutDown"]}
                className="lazy"
                src={getImg().default}
              />
            </LazyimgWrapper>
          </div>
          <I className="i-error">
            注意：这里 <strong className="strong">"animation"</strong> 依赖于<a
              className="link"
              href="https://github.com/daneden/animate.css"
              target="blank"
            >
              animate.css
            </a>， 并且使用的是 <strong className="strong">出动画（如 "slideOutDown"）</strong>，因为使用了 "LazyimgWrapper" 
          </I>
          <Prism>
            {`
  import Lazyimg, { LazyimgWrapper, withLazyimg } from 'react-lazyimg-component';
  // 使用 withLazyimg 配置
  const Lazy = withLazyimg({
    placeholder: <Placeholder img={Loading} />,
    threshold:0.98
  });
  <LazyimgWrapper style={{height: "100%", width: "100%"}}>
    <Lazy 
      animateType="animation"
      animateClassName={["animated","slideOutDown"]}
      className="lazy"
      src={'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'}
    />
  </LazyimgWrapper>
            `}
          </Prism>
        </div>
        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="动画效果" className="sub" />
          <div className="example-img">
            {/* <Lazy1
              className="lazy"
              src={getImg()}
              js_effect="transition.flipXIn" // 不会生效
              css_effect={['animated', 'rollIn']} // 定制 css 动画效果
            /> */}
          </div>
          <I className="i-error">
            注意：<strong className="strong">css-effect</strong>依赖于<a
              className="link"
              href="https://github.com/daneden/animate.css"
              target="blank"
            >
              animate.css
            </a>。需要确保<a
              className="link"
              href="https://github.com/daneden/animate.css"
              target="blank"
            >
              animate.css
            </a>已安装。并且<strong className="strong">css-effect</strong>优先级大于<strong className="strong">
              js-effect
            </strong>。即如果同时设置了<strong className="strong">
              js-effect
            </strong>和<strong className="strong">css-effect</strong>，只有<strong className="strong">
              css-effect
            </strong>会生效。
          </I>
          <Prism>
            {`
  // 配置
  const config = {
    js_effect="transition.flipXIn" // 不会生效
    css_effect={['animated', 'rollIn']} // 定制 css 动画效果
  };
  const Lazy = withLazyimg(config);
  // 调用
  <Lazy
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />;
            `}
          </Prism>
        </div>

        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="基于load钩子函数自定义动画效果" className="sub" />
          <div className="example-img">
            <Lazyimg
              className="lazy"
              src={getImg()}
              load={el => {
                window.Velocity(el, 'transition.whirlIn', {
                  duration: 600,
                });
              }}
            />
          </div>
          <I className="i">
            提示：如果<a
              className="link"
              href="https://github.com/daneden/animate.css"
              target="blank"
            >
              {' '}
              animate.css
            </a>和<a
              className="link"
              href="https://github.com/julianshapiro/velocity"
              target="blank"
            >
              velocity.js
            </a>都不满足你的需求。可以基于load配置项自定义动画效果。另外，确保不要指定<strong className="strong">
              js-effect
            </strong>和<strong className="strong">css-effect</strong>。因为<strong className="strong">
              react-lazyimg-component
            </strong>也会触发<strong className="strong">js-effect</strong>和<strong className="strong">
              css-effect
            </strong>动画效果。
          </I>
          <Prism>
            {`
  // 调用
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    load={(el)=>{ // 自定义动画效果
      window.Velocity(el, 'transition.whirlIn', {
        duration: 600,
      });
    }}
  />
            `}
          </Prism>
        </div>

        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="父级动画效果" className="sub" />
          <div className="example-img">
            {/* <Lazy1
              className="lazy"
              src={getImg()}
              js_effect="transition.flipXIn" // 不会生效
              css_effect={['animated', 'flipInY']} // 定制 css 动画效果
              parent={2}
            /> */}
          </div>
          <I className="i-desc">
            当图片元素加载完，动画效果会作用在指定的父级元素上。
          </I>
          <Prism>
            {`
  <div className="example-wp"> // 指定动画效果作用于该父级元素
    <Title title="父级动画效果" className="sub" />
    <div className="example-img">
      <Lazyimg
        className="lazy"
        src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
        css_effect={['animated', 'flipInY']} // 定制 css 动画效果
        parent=".example-wp" // 指定父级元素选择器，也可以指定父级层级level：2
      />
    </div>
  </div>
            `}
          </Prism>
        </div>
        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="placeholder 组件" className="sub" />
          <div className="example-img">
            <Lazyimg
              className="lazy"
              placeholder={<Placeholder img={require('../../img/fire.svg')} />}
              src={getImg()}
              js_effect="transition.perspectiveDownIn"
            />
          </div>
          <I className="i">
            提示：如果普通的<strong className="strong">placeholder</strong>图片不能满足你，可以定制一个 react placeholder 组件哦😝
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

  // 配置
  const Lazy = withLazyimg({
    js_effect: 'transition.perspectiveDownIn',
    placeholder: <Placeholder img={require('./loading.svg')} />,
  });
  // 调用
  <Lazy
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />
            `}
          </Prism>
        </div>

        {/* -------------------- 分割线 --------------------- */}
        <div className="example-wp">
          <Title title="响应式图片( picture / srcset )" className="sub" />
          {/* ---------- srcset -------- */}
          <div className="example-img">
            {/* <Lazy1
              className="lazy"
              src={getImg()}
              srcSet={`${getRImg()} 1x, ${getRImg()} 2x, ${getRImg()} 3x`}
              js_effect="transition.bounceIn"
            /> */}
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
    js_effect="transition.bounceIn"
  />
            `}
          </Prism>
          {/* ---------- sizes -------- */}
          <div className="example-img">
            {/* <Lazy1
              className="lazy"
              src={getImg()}
              srcSet={`${getRImg()} 360w, ${getRImg()} 640w, ${getRImg()} 980w`}
              sizes="(max-width: 370px) 90vw, (max-width: 640px) 100vw,(max-width: 980px) 100vw, 1300"
              js_effect="transition.bounceIn"
            /> */}
          </div>
          <I className="i-desc">
            响应式图片：<strong className="strong">srcSet</strong>和<strong className="strong">
              sizes
            </strong>的使用
          </I>
          <Prism>
            {`
// media-query、srcSet、sizes
  <Lazyimg
    className="lazy"
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    srcSet="source_360.png 360w, source_640.png 640w, source_980.png 980w, source_1290.png 1290w"
    sizes="(min-width: 370px) 100vw, (min-width: 640px) 75vw,(max-width: 980px) 50vw, 360"
    js_effect="transition.bounceIn"
  />
            `}
          </Prism>
          {/* ---------- picture -------- */}
          <div className="example-img">
            <picture>
              <source media="(min-width: 650px)" srcSet={getRImg()} />
              <source media="(min-width: 465px)" srcSet={getRImg()} />
              {/* <Lazy1
                className="lazy"
                src={getImg()}
                js_effect="transition.expandIn"
              /> */}
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
      js_effect="transition.expandIn"
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
