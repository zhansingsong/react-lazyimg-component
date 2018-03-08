import React, { Component } from 'react';
import './style.scss';
import Header from '../Header';
import Usage from '../Usage';
import Example from '../Example';
class App extends Component {
  render(){
    return (<div className='app'>
      {/* <Header></Header> */}
      {/* <Usage></Usage> */}
      <Example></Example>
    </div>);
  }
}
export default App;