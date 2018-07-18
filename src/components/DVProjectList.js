import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';

import { Table, Icon, Button, Popconfirm, Divider } from 'antd';
import 'antd/dist/antd.css';

import DVNewTaskComponent from './DVNewTaskComponent';
import { UserContext } from '../context/UserContext';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskCreateCancel = this.handleTaskCreateCancel.bind(this);

    this.state = {
      projectUUID: props.match.params.projectUUID,
      tasks: [],
      showAddTask: false,
      jwt: props.jwt
    };
  }

  componentDidMount() {
    const { projectUUID } = this.state;
    let url = `http://localhost:5000/api/lists/${projectUUID}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => response.json())
      .then(json => {
        if (!!json.todotask_items) {
          this.setState({
            tasks: json.todotask_items
          });
        }
        console.log(json);
      })
      .catch(error => console.error(error));
  }

  handleAddTask() {
    this.setState({ showAddTask: true });
  }

  handleTaskCreateCancel() {
    this.setState({ showAddTask: false });
  }

  render() {
    const { showAddTask, projectUUID, tasks } = this.state;
    let button;

    // console.log(projectUUID);

    const columns = [
      {
        title: 'Task',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
          <a href={`/tasks/${record.id}`} title={record.title} key={record.id}>
            {record.title}
          </a>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a
                href={`http://localhost:5000/api/tasks/${record.id}/delete`}
                key={record.id}
              >
                Delete
              </a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a
                href={`http://localhost:5000/api/tasks/${record.id}/archive`}
                key={record.id}
              >
                Archive
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];

    if (!showAddTask) {
      button = (
        <Button
          onClick={this.handleAddTask}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          <Icon type="plus" /> Add a task
        </Button>
      );
    }
    return (
      <div style={{ marginTop: '1em' }}>
        {button}
        {showAddTask ? (
          <React.Fragment>
            <DVNewTaskComponent {...this.props} ownedBy={projectUUID} />
            <Button
              style={{ marginBottom: '1em' }}
              onClick={this.handleTaskCreateCancel}
            >
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <Table
            dataSource={tasks}
            columns={columns}
            rowKey={record => record.id}
          />
        )}
      </div>
    );
  }
}

// export default ProjectList;

const WrappedProjectList = withRouter(ProjectList);

class DVProjectList extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <WrappedProjectList {...this.props} jwt={state.currentUser.jwt} />
        )}
      </UserContext.Consumer>
    );
  }
}

export { DVProjectList };
