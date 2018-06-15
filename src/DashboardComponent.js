import React from 'react';

import TodoListComponent from './TodoListComponent';
import NewTaskComponent from './NewTaskComponent';

import { Route, Switch, Link } from 'react-router-dom';

import { Layout, Menu, Icon, Badge, Divider } from 'antd';

const { Content, Sider } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="inbox">
                <Icon type="inbox" />
                <span>
                  <Link to="/dashboard">Inbox</Link>{' '}
                  <Badge
                    count={2}
                    style={{
                      backgroundColor: '#fff',
                      color: '#999',
                      boxShadow: '0 0 0 1px #d9d9d9 inset'
                    }}
                  />
                </span>
              </Menu.Item>
              <Menu.Item key="today">
                <Icon type="calendar" />
                <span>Today</span>
              </Menu.Item>
              <Menu.Item key="this-week">
                <Icon type="calendar" />
                <span>This week</span>
              </Menu.Item>
              <Menu.Item key="unsorted">
                <Icon type="question" />
                <span>
                  Unsorted{' '}
                  <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
                </span>
              </Menu.Item>
              <Menu.Item key="archived">
                <Icon type="laptop" />
                <span>Archived</span>
              </Menu.Item>
              <Divider type="horizontal" />
              <Menu.Item key="add-one">
                <Icon type="plus" />
                <span>New project</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Switch>
              <Route exact path="/dashboard" component={TodoListComponent} />
              <Route
                exact
                path="/dashboard/tasks/new"
                component={NewTaskComponent}
              />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}
