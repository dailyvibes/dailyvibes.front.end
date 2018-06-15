import React, { Component } from 'react';
import { Form, Input, Button, Switch, Select } from 'antd';
import { DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class DVNewTaskComponent extends Component {
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
  render() {
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
            {getFieldDecorator('date-time-picker', config)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Remind me">
            {getFieldDecorator('remindMe', { valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Tag">
            {getFieldDecorator('select-multiple', {
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
            {getFieldDecorator('select', {
              rules: [{ required: true, message: 'Please select a project' }]
            })(
              <Select placeholder="Please select a project">
                <Option value="inbox">Inbox</Option>
                <Option value="today">Today</Option>
                <Option value="this-week">This week</Option>
                <Option value="unsorted">Unsorted</Option>
              </Select>
            )}
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

export default NewTaskComponent;
