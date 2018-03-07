import React from 'react';
import './style.scss';
export default props => {
  let { className, text, img } = props;
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
    { text && <span className="placeholder-text" >{text}</span> }
    </div>
  );
};