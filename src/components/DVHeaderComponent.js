import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';

import { UserContext } from '../context/UserContext';

const { Header } = Layout;

class DVLoggedInMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);

    this.state = {
      current: 'home',
      handleMenuClick: this.handleMenuClick
    };
  }

  handleMenuClick(event) {
    this.setState({
      current: event.key
    });
  }

  render() {
    return (
      <Menu
        onClick={this.state.handleMenuClick}
        theme="dark"
        mode="horizontal"
        selectedKeys={[this.state.current]}
        style={{
          lineHeight: '64px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Daily Vibes</Link>
        </Menu.Item>
        <Menu.Item key="projects">
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#ffffff' }}>
              U
            </Avatar>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

class DVLoggedOutMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);

    this.state = {
      current: 'home',
      handleMenuClick: this.handleMenuClick
    };
  }

  handleMenuClick(event) {
    this.setState({
      current: event.key
    });
  }

  render() {
    return (
      <Menu
        onClick={this.state.handleMenuClick}
        theme="dark"
        mode="horizontal"
        selectedKeys={[this.state.current]}
        style={{
          lineHeight: '64px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Daily Vibes</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const WrappedDVLoggedInMenuComponent = withRouter(DVLoggedInMenuComponent);
const WrappedDVLoggedOutMenuComponent = withRouter(DVLoggedOutMenuComponent);

export default class DVHeaderComponent extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <Header>
            {state.isAuthenticated ? (
              <WrappedDVLoggedInMenuComponent {...this.props} />
            ) : (
              <WrappedDVLoggedOutMenuComponent {...this.props} />
            )}
          </Header>
        )}
      </UserContext.Consumer>
    );
  }
}
