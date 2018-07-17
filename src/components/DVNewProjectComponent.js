import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserContext } from '../context/UserContext';
import { Redirect, withRouter } from 'react-router-dom';

const FormItem = Form.Item;

class _DVNewProjectComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: props.currentUser.jwt,
      toProjects: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { title } = values;
        const request = { list: { title: title } };
        const url = `http://localhost:5000/api/lists`;

        fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${this.state.jwt}`,
            'X-CSRF-Token': this.state.csrf
          },
          body: JSON.stringify(request)
        })
          .then(response => response.json())
          .then(json => {
            if (json && json.id) {
              // this.props.history.push(`/projects/${json.id}`);
              this.setState({
                toProjects: true,
                projectId: json.id
              });
            }
          })
          .catch(error => console.log(error));
      }
    });
  };

  componentDidMount() {
    const url = `http://localhost:5000/api/session/csrf`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json && json.csrf) {
          this.setState({
            csrf: json.csrf
          });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.toProjects === true) {
      return <Redirect to={`/projects/${this.state.projectId}`} />;
    }

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div>
        {/* <PageHeader title="Login" content={content} /> */}
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message:
                    "You cannot have a task with no title! What's the point?"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const __DVNewProjectComponent = Form.create()(_DVNewProjectComponent);
const DVNewProjectComponent = withRouter(__DVNewProjectComponent);

// export default DVNewProjectComponent;

export default class NewProjectComponent extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <DVNewProjectComponent
            {...this.props}
            currentUser={state.currentUser}
          />
        )}
      </UserContext.Consumer>
    );
  }
}
