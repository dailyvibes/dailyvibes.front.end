import React from 'react';

import { Table, Button, Divider, Icon, Popconfirm } from 'antd';
// import PageHeader from 'ant-design-pro/lib/PageHeader';

export default class TodoListComponent extends React.Component {
  render() {
    const dataSource = [
      {
        key: '1',
        task: 'Start MVP using create react app',
        name: 'test',
        completed: true,
        uuid: 'ee0b834a-43c3-4bda-b482-749b0c023251'
      },
      {
        key: '2',
        task: 'Add login and forgot password forms',
        completed: true,
        uuid: '1b5e9767-a8fa-4d28-81d0-27a4853dc374'
      },
      {
        key: '3',
        task: 'Add footer with contact information',
        uuid: '1ab08380-00cf-4ec9-b280-36a240d83145',
        completed: true
      },
      {
        key: '4',
        task: 'MVP of home / dashboard',
        uuid: '9fd05a56-df33-4d53-8b47-1df0e0cd4c79',
        completed: true
      },
      {
        key: '5',
        task: 'MVP of settings page',
        uuid: '9fd05156-df33-4d53-8b67-1df0e0cd4c79',
        completed: true
      },
      {
        key: '6',
        task: 'add logout function mvp',
        uuid: '9fd05156-df33-4d33-8b67-1df0e0cd4c79'
      }
    ];
    const columns = [
      {
        title: 'State',
        key: 'state',
        render: (text, record) => (
          <span>
            {record.completed ? (
              <Icon type="check-circle-o" />
            ) : (
              <Icon type="question" />
            )}
          </span>
        )
      },
      {
        title: 'Task',
        dataIndex: 'task',
        key: 'task'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href={`${this.props.match.url}/task/${record.uuid}/delete`}>
                Delete
              </a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href={`${this.props.match.url}/task/${record.uuid}/archive`}>
                Archive
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <div>
        {/* <PageHeader title="Unsorted" /> */}
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          href={`${this.props.match.url}/tasks/new`}
        >
          <Icon type="plus" />
          Add Task
        </Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          showHeader={false}
          size="small"
        />
      </div>
    );
  }
}
