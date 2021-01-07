const context = require.context('../img/rimgs', false, /\.jpg|jpeg|png|gif$/);
const keys = context.keys();
const images = keys.map(key => context(key).default);
const getRImg = () => images.pop();
export default getRImg;