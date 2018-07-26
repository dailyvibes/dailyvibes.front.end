import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

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
          this.setState({
            task: json
          });
        }
      })
      .catch(error => console.error(error));

    const url = `http://localhost:5000/api/lists`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          projects: json
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { task, jwt, projects } = this.state;

    return (
      <React.Fragment>
        {/* <h1> Task </h1> */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/projects/${task.list_id}`}>Project</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{task.title}</Breadcrumb.Item>
        </Breadcrumb>
        <DVTaskViewComponent
          task={task}
          jwt={jwt}
          projects={projects}
          tags={task.tags}
          notes={task.notes}
          ownedBy={task.list_id}
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
