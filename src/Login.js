import React from 'react';
import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">Daily Vibes</Menu.Item>
            <Menu.Item key="2">Login</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          iOS app that will aid you in taking control of your life, one day at
          time through specific and measurable goals
        </Footer>
      </Layout>
    );
  }
}

export default App;
