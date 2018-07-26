import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signOut: props.signOut
    };
  }

  componentWillMount() {
    this.state.signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

class DVLogoutComponent extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => <LogoutComponent {...this.props} signOut={state.signOut} />}
      </UserContext.Consumer>
    );
  }
}

export { DVLogoutComponent };
