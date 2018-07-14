import React, { Component } from 'react';
import { Form, Input, Button, Switch, Select } from 'antd';
import { DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class TaskViewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedBy: props.ownedBy,
      jwt: props.jwt,
      task: props.task,
      projects: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fieldValues = {
          ...values,
          'date-time-picker': values['date-time-picker'].format(
            'YYYY-MM-DD HH:mm:ss'
          )
        };

        console.log('Received values of form: ', fieldValues);
      }
    });
  };

  componentDidMount() {
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
    const { getFieldDecorator } = this.props.form;
    const { ownedBy, task, projects } = this.state;

    const projectsOptions = projects.map(function(project) {
      return (
        <Option value={project.id} key={project.id}>
          {project.title}
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

    console.log(task);

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
            {getFieldDecorator('duedateAt', config)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Remind me">
            {getFieldDecorator('remindMe', { valuePropName: 'checked' })(
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

const DVTaskViewComponent = Form.create()(TaskViewComponent);

export default DVTaskViewComponent;
