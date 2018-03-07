import React, { Component } from 'react';
import './style.scss';
import Prism from '../Prism';
import Title from '../Title';
class Usage extends Component {
  render() {
    return (
      <div className="usage">
        <div className="usage-wp">
          <Title title={'安装'} />
          <div className="usage-cnt">
            <Prism className="language-javascript">
              {`
  // npm
  $> npm install react-lazyimg-component
  // yarn
  $> yarn add react-lazyimg-component
            `}
            </Prism>
          </div>
          <Title title={'快速入门'} />
          <div className="usage-cnt">
            <Prism className="language-javascript">
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
        </div>
      </div>
    );
  }
}
export default Usage;
