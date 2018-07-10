import React from 'react';
import {Switch, Route} from 'react-router-dom';

import { NavLink } from 'react-router-dom';

import Icons from './icons';


class Navigation extends React.Component {

  constructor() {
    super();
  }

  render() {
    if(!this.props.show){
      return null;
    }
    return (
      <div className="nav">
        <NavLink to="/home" activeClassName="active" className='link-home' >
          <Icons iconName='home' size="26" />
          <div>Home</div>
        </NavLink>
        <NavLink to={{ pathname: '/jobs', query: { from: 'nav' } }} activeClassName="active" className='link-jobs'>
          <Icons iconName='jobs' size="26" />
          <div >Applied</div>
        </NavLink>
        <NavLink to="/interview"  activeClassName="active" className='link-interview'>
          <Icons iconName='interview' size="26" />
          <div>Interview</div>
        </NavLink>
        <NavLink to="/chat"  activeClassName="active" className='link-chat'>
          <Icons iconName='chat' size="26" />
          <div>Chat }</div>
        </NavLink>
        <NavLink to="/account"  activeClassName="active setting" className='link-account'>
          <Icons iconName='settings' size="26" />
          <div>Account</div>
        </NavLink>
      </div>
    );
  }
}

export default Navigation;
