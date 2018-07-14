import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';

import DVTaskViewComponent from './DVTaskViewComponent';
import { UserContext } from '../context/UserContext';

class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: props.match.params.uuid,
      task: {},
      projects: [],
      jwt: props.jwt
    };
  }

  componentDidMount() {
    const { uuid } = this.state;
    let taskURL = `http://localhost:5000/api/tasks/${uuid}`;
    fetch(taskURL, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => response.json())
      .then(json => {
        if (!!json) {
          console.log(json);
          this.setState({
            task: json
          });
        }
        // console.log(json);
      })
      .catch(error => console.error(error));
  }

  render() {
    const { task } = this.state;
    return (
      <React.Fragment>
        <h1> Task </h1>
        <DVTaskViewComponent
          ownedBy={task.list_id}
          task={task}
          jwt={this.state.jwt}
        />
      </React.Fragment>
    );
  }
}

// export default DVTaskComponent;

const WrappedTaskComponent = withRouter(TaskComponent);

class DVTaskComponent extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => <WrappedTaskComponent jwt={state.getToken()} />}
      </UserContext.Consumer>
    );
  }
}

export { DVTaskComponent };
