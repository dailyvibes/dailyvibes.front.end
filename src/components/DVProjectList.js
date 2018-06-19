import React from 'react';

import { Table, Icon, Button, Popconfirm, Divider } from 'antd';
import 'antd/dist/antd.css';

import DVNewTaskComponent from './DVNewTaskComponent';

const dataSource = [
  {
    name: 'Functional and Class Components',
    uuid: '08799e85-34cb-4c9a-94b1-1de61ca3f27f',
    key: '08799e85-34cb-4c9a-94b1-1de61ca3f27f'
  },
  {
    name: 'Rendering a Component',
    uuid: 'cd7640ca-dcf5-452c-96ed-36a303595def',
    key: 'cd7640ca-dcf5-452c-96ed-36a303595def'
  },
  {
    name: 'Composing Components',
    uuid: '0eaab8f5-3283-41f8-b9f9-b77a3d45134d',
    key: '0eaab8f5-3283-41f8-b9f9-b77a3d45134d'
  }
];

class DVProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskCreateCancel = this.handleTaskCreateCancel.bind(this);

    this.state = {
      projectUUID: props.match.params.projectUUID,
      showAddTask: false
    };
  }

  handleAddTask() {
    this.setState({ showAddTask: true });
  }

  handleTaskCreateCancel() {
    this.setState({ showAddTask: false });
  }

  render() {
    const { showAddTask, projectUUID } = this.state;
    let button;

    console.log(projectUUID);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <a href={`/task/${record.uuid}`} title={record.name}>
            {record.name}
          </a>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href={`/task/${record.uuid}/delete`}>Delete</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href={`/task/${record.uuid}/archive`}>Archive</a>
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
            <DVNewTaskComponent ownedBy={projectUUID} />
            <Button
              style={{ marginBottom: '1em' }}
              onClick={this.handleTaskCreateCancel}
            >
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <Table dataSource={dataSource} columns={columns} />
        )}
      </div>
    );
  }
}

export default DVProjectList;
