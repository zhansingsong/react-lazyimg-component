import React, { Component } from 'react';
import './style.scss';
class I extends Component {
  render() {
    let {icon, text, className, children} = this.props;
    return (
      <div className={['i', className]
        .filter(item => {
          if (item) {
            return item;
          }
        })
        .join(' ')} ><i className="i-icon">{icon}</i>{children || Text }</div>
    );
  }
}
export default I;
