import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import { DVProjectList } from './DVProjectList';
import DVNewProjectComponent from './DVNewProjectComponent';

import { Icon, Button } from 'antd';

import { Select } from 'antd';
import { UserContext } from '../context/UserContext';
const Option = Select.Option;

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleProjectCreateCancel = this.handleProjectCreateCancel.bind(this);

    this.state = {
      projects: [],
      selectedProject: undefined,
      showAddProject: false,
      jwt: props.jwt
    };
  }

  componentDidMount() {
    const url = `http://localhost:5000/api/lists`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          projects: json
        });
      })
      .catch(error => console.error(error));
  }

  handleAddProject() {
    this.setState({ showAddProject: true });
  }

  handleChange(value) {
    if (value && value.key) {
      let match = this.props.match;
      let redirectURL = `${match.url}/${value.key}`;
      this.setState({ selectedProject: value.key });
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
      showAddProject: false,
      selectedProject: ''
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
        <Option value={project.id} key={project.id}>
          {project.title}
        </Option>
      );
    });

    // const PrivWrappedDVProjectList = withRouter(DVProjectList);
    // const WrappedDVProjectList = (
    //   <PrivWrappedDVProjectList {...this.props} projects={projects} />
    // );

    return (
      <div>
        <h2>Projects</h2>
        {button}
        {showAddProject ? (
          <React.Fragment>
            <DVNewProjectComponent {...this.props} />
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
              component={DVProjectList}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const WrappedProjectsList = withRouter(ProjectsList);

class DVProjectsList extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <WrappedProjectsList {...this.props} jwt={state.currentUser.jwt} />
        )}
      </UserContext.Consumer>
    );
  }
}

// export default withRouter(ProjectsList);
export { DVProjectsList };
