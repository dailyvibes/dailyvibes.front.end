import React from 'react';
import { withRouter, Link } from 'react-router';

import { Table, Icon, Divider, Button } from 'antd';
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
  }
];

class DVProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);

    this.state = {
      showAddTask: false
    };
  }

  handleAddTask() {
    this.setState({
      showAddTask: true
    });
  }

  render() {
    const { showAddTask } = this.state;
    let button;
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
        {showAddTask && <DVNewTaskComponent />}
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default DVProjectList;
