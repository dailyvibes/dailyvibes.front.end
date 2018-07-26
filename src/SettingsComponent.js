import React, { Component } from 'react';

import { Row, Col, Divider, Tooltip } from 'antd';
import { Form, Icon, Input, Button, message } from 'antd';
import { UserContext } from './context/UserContext';

const FormItem = Form.Item;

class DVSettings extends Component {
  constructor(props) {
    super(props);
    // console.log('DVSettings:', props);

    this.state = {
      currentUser: props.currentUser,
      jwt: props.currentUser.jwt,
      signOut: props.signOut,
      _updateToken: props._updateToken
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { email, password } = values;
        const request = { user: { email: email, password: password } };
        const url = `http://localhost:5000/api/users/${
          this.state.currentUser.id
        }`;

        fetch(url, {
          method: 'PATCH',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${this.state.jwt}`
            // 'X-CSRF-Token': this.state.csrf
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(request)
        })
          .then(response => {
            switch (response.status) {
              case 403:
                message.warning('Please try again');
                return;
              case 200:
                // response.headers.forEach((val, key) => {
                //   console.log(key, val);
                // });
                const newToken = response.headers.get('authorization');

                this.state._updateToken(newToken);
                message.success('Saved');

                return response.json();
              default:
                return;
            }
          })
          .catch(error => {
            message.error('Error!!!');
            console.log(error);
          });
      }
    });
  };

  // componentDidMount() {
  //   let url = `http://localhost:5000/api/current`;
  //   fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.state.jwt}`
  //     }
  //   })
  //     .then(response => {
  //       switch (response.status) {
  //         case 401:
  //           this.state.signOut();
  //           return;
  //         case 200:
  //           return response.json();
  //         default:
  //           return;
  //       }
  //     })
  //     .then(json => {
  //       // console.log(json);
  //       if (json && json.email && json.id) {
  //         this.setState({
  //           email: json.email,
  //           uID: json.id,
  //           role: json.role,
  //           admin: json.admin
  //         });
  //       }
  //     })
  //     .catch(error => console.error(error));
  // }

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
                      required: true,
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

const Settings = Form.create({
  // onFieldsChange(props, changedFields) {
  //   props.onChange(changedFields);
  // },
  mapPropsToFields(props) {
    // console.log('mapPropsToFields', props);
    return {
      email: Form.createFormField({
        ...props.email,
        value: props.email.value
      })
    };
  }
  // onValuesChange(_, values) {
  //   console.log(values);
  // }
})(DVSettings);

class DVUserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: props.currentUser.jwt
    };
  }

  componentDidMount() {
    let url = `http://localhost:5000/api/current`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => {
        switch (response.status) {
          case 401:
            this.state.signOut();
            return;
          case 200:
            return response.json();
          default:
            return;
        }
      })
      .then(json => {
        if (json && json.email && json.id) {
          this.setState({
            email: json.email,
            uID: json.id,
            role: json.role,
            admin: json.admin
          });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <Settings {...this.props} email={{ value: this.state.email }} />
        )}
      </UserContext.Consumer>
    );
  }
}

class UserSettings extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <DVUserSettings
            currentUser={state.currentUser}
            signOut={state.signOut}
            _updateToken={state._updateToken}
          />
        )}
      </UserContext.Consumer>
    );
  }
}

export default UserSettings;
