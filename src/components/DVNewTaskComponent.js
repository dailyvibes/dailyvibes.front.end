import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Switch, Select } from 'antd';
import { DatePicker } from 'antd';
import { UserContext } from '../context/UserContext';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class DVNewTaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedBy: props.ownedBy,
      currentUser: props.currentUser,
      jwt: props.jwt
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fieldValues = {
          ...values,
          tags: values['tags'].toString(),
          duedate_at: values['duedate_at'].utc().format()
        };

        let request = { task: { ...fieldValues } };
        let url = `http://localhost:5000/api/tasks`;

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
            console.log(json);
          })
          .catch(error => console.log(request));

        // console.log('Received values of form: ', fieldValues);
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
    const { getFieldDecorator } = this.props.form;
    const { ownedBy } = this.state;

    const projects = [
      {
        name: 'Inbox',
        uuid: '73b0bba1-d38a-417b-934f-ab4655e66439'
      },
      {
        name: 'Today',
        uuid: '28111558-dc23-4a01-8113-560c7994f59a'
      },
      {
        name: 'This week',
        uuid: '17c56e12-1fad-490e-aa4f-8ee292495166'
      },
      {
        name: 'Unsorted',
        uuid: 'b7d60a41-af99-4c60-8ab1-bf4655c2f53f'
      },
      {
        name: 'Archived',
        uuid: '5aead042-0231-47e6-8314-5d938c6d57c0'
      }
    ];

    const projectsOptions = projects.map(function(project) {
      return (
        <Option value={project.uuid} key={project.uuid}>
          {project.name}
        </Option>
      );
    });

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

    const config = {
      rules: [{ type: 'object', message: 'Please select time!' }]
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
          <FormItem {...formItemLayout} label="Due">
            {getFieldDecorator('duedate_at', config)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Remind me">
            {getFieldDecorator('remindable', { valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Tag">
            {getFieldDecorator('tags', {
              rules: [
                {
                  message: 'Create a new tag or use one below',
                  type: 'array'
                }
              ]
            })(
              <Select mode="multiple" placeholder="Use a tag">
                <Option value="new">new</Option>
                <Option value="improved">improved</Option>
                <Option value="fixed">fixed</Option>
                <Option value="bug">bug</Option>
                <Option value="feature">feature</Option>
                <Option value="something-to-investigate">
                  something to investigate
                </Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Project" hasFeedback>
            {getFieldDecorator('project', {
              initialValue: ownedBy,
              rules: [{ required: true, message: 'Please select a project' }]
            })(
              <Select placeholder={`Please select a project`}>
                {projectsOptions}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Notes">
            {getFieldDecorator('notes')(<TextArea rows={4} />)}
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

const NewTaskComponent = Form.create()(DVNewTaskComponent);

const WrappedNewTaskComponent = withRouter(NewTaskComponent);

export default class extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <WrappedNewTaskComponent
            {...this.props}
            currentUser={state.currentUser}
            jwt={state.getToken()}
          />
        )}
      </UserContext.Consumer>
    );
  }
}
