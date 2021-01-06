import React from 'react';
import './style.scss';
export default props => {
  let { className, text, img, ...rest } = props;
  console.log(props.ref, 'props.ref');
  return (
    <div
      className={['placeholder', className]
        .filter(item => {
          if (item) {
            return item;
          }
        })
        .join(' ')}
        {...rest}
    >
    { img && <img src={img} className="placeholder-img" />}
    { text && <span className="placeholder-text" >{text}</span> }
    </div>
  );
};