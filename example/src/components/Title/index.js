import React, { Component } from 'react';
import './style.scss';
class Title extends Component {
  render() {
    let {title='标题', className, style={borderLeftColor:'#61dafb'}} = this.props;
    return (
      <h2 className={['title', className].filter(i=>{if(i)return i;}).join(' ')}>{title}</h2>
    );
  }
}
export default Title;
