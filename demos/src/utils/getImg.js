const context = require.context('../img/bgs', false, /\.jpg|jpeg|png|gif$/);
const keys = context.keys();
const len = keys.length;
export default (keyss)=>{
  // let index = Math.floor(Math.random()*len);
  // let key = keys[index];
  let key = keys.pop();
  return context(key);
}