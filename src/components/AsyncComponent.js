import React, { Component } from 'react';
import {showSpin,hideSpin,notification} from '../components/util';
export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
      showSpin();
    }

    componentDidMount() {
      importComponent()
        .then(c => {
          const { default: component } = c;
          this.setState({component: component});
          hideSpin();
        }, cause =>{hideSpin(); console.log(cause)});
    }

    render() {
      const C = this.state.component;
      return C
        ? <C {...this.props} />
        : null;
    }

  }

  return AsyncComponent;
}
