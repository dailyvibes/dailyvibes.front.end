import React from 'react';
import './NormalLoginForm.css';

import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Row, Col } from 'antd';

import PageHeader from 'ant-design-pro/lib/PageHeader';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.state = {
      loginType: 'email'
    };
  }

  handleSwitchChange(props) {
    // debugger;
    if (props === '1') {
      this.setState({ loginType: 'username' });
    }
    if (props === '2') {
      this.setState({ loginType: 'email' });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('In login state:', this.state.loginType);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const content = (
      <div>
        <p>
          Hey! Thank you for taking the time to find us. Moreover, thank you for
          checking out this new phase of Daily Vibes. I will work really hard to
          make sure everything runs smoothly. However, just be aware that this
          is a work in progress.
        </p>
      </div>
    );

    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <PageHeader title="Login" content={content} />
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ margin: '1rem 0' }}
            >
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
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                <Link to="/forgot" className="login-form-forgot">
                  Forgot password
                </Link>
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
