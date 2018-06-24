import React from 'react';

import DVTaskViewComponent from './DVTaskViewComponent';

class DVTaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: props.match.params.uuid,
      task: {}
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1> Task </h1>
        {this.state.uuid}
        <DVTaskViewComponent />
      </React.Fragment>
    );
  }
}

export default DVTaskComponent;
