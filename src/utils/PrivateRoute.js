import React from 'react';
import { UserContext } from '../context/UserContext';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const DVPrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {state => (
      <Route
        {...rest}
        render={props =>
          state.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
);

export { DVPrivateRoute };
