import React from 'react';
import { withRouter, Link } from 'react-router';

import { Table, Icon, Divider, Button } from 'antd';
import 'antd/dist/antd.css';

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
      <a href={`/topic/${record.uuid}`} title={record.name}>
        {record.name}
      </a>
    )
  }
];

class DVTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicId: props.match.params.topicId
    };
  }

  render() {
    // console.log(this.props);

    // let topicID = this.props.match.params.topicId;

    return (
      <div style={{ marginTop: '1em' }}>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a topic
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default DVTopic;
