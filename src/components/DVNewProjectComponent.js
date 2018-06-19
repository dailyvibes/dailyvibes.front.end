import React, { Component } from 'react';
import { Form, Input, Button, Switch, Select } from 'antd';
import { DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class _DVNewProjectComponent extends Component {
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

const DVNewProjectComponent = Form.create()(_DVNewProjectComponent);

export default DVNewProjectComponent;