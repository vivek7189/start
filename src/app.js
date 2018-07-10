import React from 'react';
import {Switch, Route,HashRouter, Redirect} from 'react-router-dom';

import asyncComponent from './components/AsyncComponent';
//import Home from './flows/home/home.js'
import Navigation from './components/navigation';
const Home = asyncComponent(() => import(/* webpackChunkName: "home" */ './flows/home/home.js'));
 
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      nav:true
    }
  }
  render() {
    return (  
      <HashRouter>    
        <div>
          <Switch>
            <Route path='/home'  render={(props)=> <Home {...props} />}/>
          </Switch>
          <Navigation show={this.state.nav}/>
          </div>
      </HashRouter>
    );
  }
}

export default App;

