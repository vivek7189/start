import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './home.scss'

class Home extends React.Component {
  constructor() {
    super();
  }

  componentDidMount (){
  }

  componentWillUnmount(){
  }

  

  render() {
    return (
       <div className="fixed-header clear-bottom">
         Home
       </div>
    );
  }

}

export default Home;
