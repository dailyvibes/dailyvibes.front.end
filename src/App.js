import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Icon } from 'antd';

import WrappedNormalLoginForm from './NormalLoginForm';
import ForgotPasswordForm from './ForgotPassword';
import Home from './HomeComponent';
import About from './AboutComponent';
import Settings from './SettingsComponent';
// import ProjectsComponent from './components/ProjectsComponent';
import { DVTaskComponent } from './components/DVTaskComponent';
import DVHeaderComponent from './components/DVHeaderComponent';
import { DVLogoutComponent } from './components/DVLogoutComponent';

import { DVProjectsList } from './components/DVProjectsList';

import { UserContextWrapper } from './context/UserContext';
import { DVPrivateRoute } from './utils/PrivateRoute';

import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

const { Content, Footer } = Layout;

const Login = () => (
  <React.Fragment>
    <WrappedNormalLoginForm />
  </React.Fragment>
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
  render() {
    return (
      <UserContextWrapper>
        <Router>
          <Layout className="layout" style={{ minHeight: '100vh' }}>
            <DVHeaderComponent />
            <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  minHeight: 'calc(100vh - 20vh)'
                }}
              >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={DVLogoutComponent} />
                  <Route path="/forgot" component={ForgotPasswordForm} />
                  <DVPrivateRoute path="/projects" component={DVProjectsList} />
                  <DVPrivateRoute path="/settings" component={Settings} />
                  <DVPrivateRoute
                    path="/tasks/:uuid"
                    component={DVTaskComponent}
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ overflow: 'hidden' }}>
              <GlobalFooter links={links} copyright={copyright} />
            </Footer>
          </Layout>
        </Router>
      </UserContextWrapper>
    );
  }
}

export default App;
