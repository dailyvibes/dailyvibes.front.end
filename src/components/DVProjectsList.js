import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import DVProjectList from './DVProjectList';
import DVNewProjectComponent from './DVNewProjectComponent';

import { Icon, Button } from 'antd';

import { Select } from 'antd';
const Option = Select.Option;

class DVProjectsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleProjectCreateCancel = this.handleProjectCreateCancel.bind(this);

    this.state = {
      projects: [
        {
          name: 'Inbox',
          uuid: '73b0bba1-d38a-417b-934f-ab4655e66439'
        },
        {
          name: 'Today',
          uuid: '28111558-dc23-4a01-8113-560c7994f59a'
        },
        {
          name: 'This week',
          uuid: '17c56e12-1fad-490e-aa4f-8ee292495166'
        },
        {
          name: 'Unsorted',
          uuid: 'b7d60a41-af99-4c60-8ab1-bf4655c2f53f'
        },
        {
          name: 'Archived',
          uuid: '5aead042-0231-47e6-8314-5d938c6d57c0'
        }
      ],
      selectedProject: undefined,
      showAddProject: false
    };
  }

  handleAddProject() {
    this.setState({ showAddProject: true });
  }

  handleChange(value) {
    if (value && value.key) {
      let match = this.props.match;
      let redirectURL = `${match.url}/${value.key}`;
      this.props.history.push(redirectURL);
    }
  }

  // handleAdd() {
  //   const { projects } = this.state;
  //   const newData = {
  //     uuid: '64d0bff3-e35e-4e9f-a27c-e06cb5867775',
  //     name: `Building layout components for specific use cases`
  //   };

  //   this.setState({
  //     projects: [...projects, newData]
  //   });
  // }

  handleProjectCreateCancel() {
    this.setState({
      showAddProject: false
    });
  }

  render() {
    let match = this.props.match;
    const { projects, showAddProject } = this.state;
    let button;

    if (!showAddProject) {
      button = (
        <Button
          onClick={this.handleAddProject}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          <Icon type="plus" /> Add a project
        </Button>
      );
    }

    let selectionProjects = projects.map(function(project) {
      return (
        <Option value={project.uuid} key={project.uuid}>
          {project.name}
        </Option>
      );
    });

    return (
      <div>
        <h2>Projects</h2>
        {button}
        {showAddProject ? (
          <React.Fragment>
            <DVNewProjectComponent />
            <Button
              style={{ marginLeft: 8 }}
              onClick={this.handleProjectCreateCancel}
            >
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Select
              labelInValue
              style={{ width: '100%' }}
              onChange={this.handleChange}
              placeholder="Please select a project."
            >
              {selectionProjects}
            </Select>
            <Route
              path={`${match.url}/:projectUUID`}
              component={withRouter(DVProjectList)}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(DVProjectsList);
