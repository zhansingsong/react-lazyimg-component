const context = require.context('../img/bgs', false, /\.jpg|jpeg|png|gif$/);
const keys = context.keys();
const images = keys.map(key => context(key).default);
const getImg = () => images.pop();
export default getImg;