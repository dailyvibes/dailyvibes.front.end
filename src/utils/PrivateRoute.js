import React from 'react';
import { UserContext } from '../context/UserContext';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

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
