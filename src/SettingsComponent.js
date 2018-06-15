import React from 'react';

import { Row, Col, Divider, Badge, Tooltip } from 'antd';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class DVSettings extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <h1>Settings</h1>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ margin: '1rem 0' }}
            >
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                label="Membership"
              >
                <span className="ant-form-text">
                  <Badge status="success" text="Admin" />
                  <Divider type="vertical" />
                  <Badge status="success" text="Kickstart Backer" />
                  <Divider type="vertical" />
                  <Badge status="success" text="Premium" />
                  <Divider type="vertical" />
                  <Badge status="processing" text="Guest" />
                  <Divider type="vertical" />
                  <Badge status="warning" text="Timed Trial" />
                </span>
              </FormItem>
              <FormItem
                label={
                  <span>
                    Username{' '}
                    <Tooltip title="How would you like others to find you if you make your profile public?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('userName', {
                  rules: [
                    { required: false, message: 'Please input your username!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                )}
              </FormItem>
              <FormItem
                label="E-mail"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: false,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Email"
                  />
                )}
              </FormItem>
              <FormItem
                label="Password"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button type="dashed">Change</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Divider type="vertical" />
        <Row>
          <Col span={12}>
            <Button type="danger" href="/delete" size="small" icon="delete">
              Delete my Daily Vibes account
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const Settings = Form.create()(DVSettings);
export default Settings;
