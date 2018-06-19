import React from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';

import DVTopic from './Topic';
import { Menu, Dropdown, Icon, Button } from 'antd';

import { Select } from 'antd';
const Option = Select.Option;

const data = [
  {
    name: 'Rendering with React',
    uuid: 'adced4ad-81b0-41bb-8fd2-77562e0b47e3'
  },
  {
    name: 'Components',
    uuid: '5573afba-d6b2-4956-9f5d-3cec6558e275'
  },
  {
    name: 'Props v. State',
    uuid: '64d0bff3-e35e-4e9f-a27c-e065a5867775'
  }
];

class DVTopics extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      topics: [
        {
          name: 'Rendering with React',
          uuid: 'adced4ad-81b0-41bb-8fd2-77562e0b47e3'
        },
        {
          name: 'Components',
          uuid: '5573afba-d6b2-4956-9f5d-3cec6558e275'
        },
        {
          name: 'Props v. State',
          uuid: '64d0bff3-e35e-4e9f-a27c-e065a5867775'
        }
      ],
      selectedTopic: undefined
    };
  }

  handleChange(value) {
    // console.log(value); // { key: "lucy", label: "Lucy (101)" }
    let match = this.props.match;
    let redirectURL = `${match.url}/${value.key}`;
    this.props.history.push(redirectURL);
    // this.setState({
    //   shouldRedirect: true,
    //   redirectURL: redirectURL
    // });
    // <Redirect to={`${match.url}/${value.key}`} />;
  }

  handleAdd() {
    const { topics } = this.state;
    const newData = {
      uuid: '64d0bff3-e35e-4e9f-a27c-e06cb5867775',
      name: `Building layout components for specific use cases`
    };
    // console.log("handleAdd", topics);
    this.setState({
      topics: [...topics, newData]
    });
  }

  render() {
    let match = this.props.match;
    const { topics } = this.state;

    // let _topics = topics.map(function(topic) {
    //   return (
    //     <li key={topic.uuid}>
    //       <Link to={`${match.url}/${topic.uuid}`}>{topic.name}</Link>
    //     </li>
    //   );
    // });

    let selectionTopics = topics.map(function(topic) {
      return (
        <Option value={topic.uuid} key={topic.uuid}>
          {topic.name}
        </Option>
      );
    });

    return (
      <div>
        <h2>Topics</h2>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a topic
        </Button>
        <Select
          labelInValue
          style={{ width: '100%' }}
          onChange={this.handleChange}
          placeholder="Please select a topic."
        >
          {selectionTopics}
        </Select>
        <Route path={`${match.url}/:topicId`} component={withRouter(DVTopic)} />
        <Route
          exact
          path={match.url}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }
}

export default withRouter(DVTopics);
