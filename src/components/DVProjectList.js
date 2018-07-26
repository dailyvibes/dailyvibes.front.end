import React, { Component } from 'react';

import { withRouter, Redirect } from 'react-router-dom';

import { Table, Icon, Button } from 'antd';
import 'antd/dist/antd.css';

import DVNewTaskComponent from './DVNewTaskComponent';
import { UserContext } from '../context/UserContext';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskCreateCancel = this.handleTaskCreateCancel.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);

    this.state = {
      projectUUID: props.match.params.projectUUID,
      tasks: [],
      showAddTask: false,
      jwt: props.jwt,
      redirectToProjects: false,
      showDeleteBtn: false
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
          this.setState({
            showDeleteBtn: !json.dv_default
          });
        }
        // console.log(json);
      })
      .catch(error => console.error(error));
  }

  handleAddTask() {
    this.setState({ showAddTask: true });
  }

  handleTaskCreateCancel() {
    this.setState({ showAddTask: false });
  }

  handleListDelete(e) {
    e.preventDefault();

    let url = `http://localhost:5000/api/lists/${this.state.projectUUID}`;

    fetch(url, {
      method: 'Delete',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return;
        }

        this.setState({
          redirectToProjects: true
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.redirectToProjects) {
      return <Redirect to={`/projects`} />;
    }

    const { showAddTask, projectUUID, tasks, showDeleteBtn } = this.state;
    let button;

    // console.log(projectUUID);

    const columns = [
      {
        title: 'Task',
        dataIndex: 'title',
        key: 'title',
        render: (_, record) => (
          <a href={`/tasks/${record.id}`} title={record.title} key={record.id}>
            {record.title}
          </a>
        )
      }
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (_, record) => (
      //     <span>
      //       <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
      //         <a
      //           href={`http://localhost:5000/api/tasks/${record.id}/delete`}
      //           key={record.id}
      //         >
      //           Delete
      //         </a>
      //       </Popconfirm>
      //       <Divider type="vertical" />
      //       <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
      //         <a
      //           href={`http://localhost:5000/api/tasks/${record.id}/archive`}
      //           key={record.id}
      //         >
      //           Archive
      //         </a>
      //       </Popconfirm>
      //     </span>
      //   )
      // }
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
          <React.Fragment>
            <Table
              dataSource={tasks}
              columns={columns}
              rowKey={record => record.id}
            />
            {showDeleteBtn && (
              <Button
                type="danger"
                style={{ margin: '1em' }}
                onClick={this.handleListDelete}
              >
                Delete Project
              </Button>
            )}
          </React.Fragment>
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

// const PrivWrappedDVProjectList = withRouter(DVProjectList);
//     const WrappedDVProjectList = (
//       <PrivWrappedDVProjectList {...this.props} projects={projects} />
//     );
