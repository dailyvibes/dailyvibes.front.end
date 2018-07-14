import React from 'react';

import { Route, withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import { DVProjectsList } from './DVProjectsList';

class ProjectsComponent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Route path={match.url} component={DVProjectsList} />
      </React.Fragment>
    );
  }
}

export default withRouter(ProjectsComponent);
