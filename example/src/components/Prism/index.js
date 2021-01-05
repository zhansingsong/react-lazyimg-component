import React, { Component } from 'react';
import './style.scss';
class Prism extends Component {
  render() {
  let {className='language-javascript', children} = this.props;
    return (
      <pre className={className}>
      <code>
        {children}
      </code>
      </pre>
    );
  }
}
export default Prism;
