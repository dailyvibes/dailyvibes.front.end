import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Avatar } from 'antd';

import WrappedNormalLoginForm from './NormalLoginForm';
import ForgotPasswordForm from './ForgotPassword';
import Home from './HomeComponent';
import About from './AboutComponent';
import Dashboard from './DashboardComponent';
import Settings from './SettingsComponent';

import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

const { Header, Content, Footer } = Layout;

const Login = () => (
  <div>
    <WrappedNormalLoginForm />
  </div>
);

const links = [
  {
    key: 'twitter',
    title: <Icon type="twitter" />,
    href: 'https://twitter.com/dailyvibesapp',
    blankTarget: true
  },
  {
    key: 'facebook',
    title: <Icon type="facebook" />,
    href: 'https://www.facebook.com/dailyvibesapp',
    blankTarget: true
  },
  {
    key: 'mail',
    title: <Icon type="mail" />,
    href: 'mailto:dailyvibesapp@gmail.com',
    blankTarget: true
  }
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2017-2018 Daily Vibes
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      current: 'home'
    };
  }

  handleMenuClick(event) {
    this.setState({
      current: event.key
    });
  }

  render() {
    return (
      <Router>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <Header>
            <Menu
              onClick={this.handleMenuClick}
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
              <Menu.Item key="dashboard">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="settings">
                <Link to="/settings">
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#ffffff' }}
                  >
                    U
                  </Avatar>
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPasswordForm} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
            </div>
          </Content>
          <Footer style={{ overflow: 'hidden' }}>
            {/* <div style={{ height: 280 }} /> */}
            <GlobalFooter links={links} copyright={copyright} />
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
