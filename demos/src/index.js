import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { getImg } from './utils/index.js';
import App from './components/App';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

ReactDOM.render(<App></App>,
  document.getElementById('root')
);