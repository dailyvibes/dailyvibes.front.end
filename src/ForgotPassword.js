import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

const FormItem = Form.Item;

class ForgotPassword extends React.Component {
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

    const content = (
      <div>
        <p>
          Are you having trouble signing in? Don't worry. Follow the follow
          procedure:
        </p>
        <ol>
          <li>
            Enter the email that you use during signing up into the form below
          </li>
          <li>Press the "Get login link in email" button below</li>
          <li>
            Simply wait for the email with easy to follow instructions to arrive
          </li>
        </ol>
        <p>
          If your email is found you will get a notifitication. For all other
          queries please contact support via{' '}
          <a href="mailto:dailyvibesapp@gmail.com">email</a> or{' '}
          <a href="https://twitter.com/dailyvibesapp">@DailyVibesApp</a> on
          twitter.
        </p>
      </div>
    );

    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <PageHeader title="Forgot Password" content={content} />
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ margin: '1rem 0' }}
            >
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Get login link in email
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const ForgotPasswordForm = Form.create()(ForgotPassword);

export default ForgotPasswordForm;
