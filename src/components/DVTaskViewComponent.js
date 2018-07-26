import React, { Component } from 'react';
import { Form, Input, Button, Switch, Select } from 'antd';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const ButtonGroup = Button.Group;

class TaskViewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      returnToProjects: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var tags, duedate_at, notes;

        if (values['tags']) {
          tags = values['tags'].toString();
        }

        if (values['duedate_at']) {
          const converted = values['duedate_at'].utc().format();
          if (converted && converted.toLowerCase() !== 'invalid date') {
            duedate_at = values['duedate_at'].utc().format();
          } else {
            duedate_at = '';
          }
        }

        if (values['notes']) {
          notes = values['notes'].toString();
        }

        const fieldValues = {
          ...values,
          notes: notes,
          tags: tags,
          duedate_at: duedate_at
        };

        let request = { task: { ...fieldValues } };
        let url = `http://localhost:5000/api/tasks/${this.props.task.id}`;

        fetch(url, {
          method: 'PATCH',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${this.props.jwt}`,
            'X-CSRF-Token': this.state.csrf
          },
          body: JSON.stringify(request)
        })
          .then(response => {
            if (!response.ok) {
              return;
            }

            message.success('Updated');

            // this.setState({
            //   returnToProjects: true
            // });

            // return response.json();
          })
          .then(json => {
            // console.log(json);
            return json;
          })
          .catch(error => {
            message.warning('Please try again.');
            console.log(error);
          });
      }
    });
  };

  handleArchiveTask = e => {
    e.preventDefault();

    let request = {
      task: { archived: true, archived_at: moment.utc().format() }
    };

    let url = `http://localhost:5000/api/tasks/${this.props.task.id}`;

    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.props.jwt}`,
        'X-CSRF-Token': this.state.csrf
      },
      body: JSON.stringify(request)
    })
      .then(response => {
        if (!response.ok) {
          return;
        }

        message.success('Updated');

        // this.setState({
        //   returnToProjects: true
        // });

        // return response.json();
      })
      .then(json => {
        // console.log(json);
        return json;
      })
      .catch(error => {
        message.warning('Please try again.');
        console.log(error);
      });
  };

  handleDestroyTask = e => {
    e.preventDefault();

    let url = `http://localhost:5000/api/tasks/${this.props.task.id}`;

    fetch(url, {
      method: 'Delete',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.props.jwt}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return;
        }

        message.success('Task deleted');

        this.setState({
          returnToProjects: true
        });
      })
      .catch(error => console.log(error));
  };

  // componentDidMount() {
  //   // const url = `http://localhost:5000/api/lists`;
  //   // fetch(url, {
  //   //   headers: {
  //   //     Authorization: `Bearer ${this.state.jwt}`
  //   //   }
  //   // })
  //   //   .then(response => response.json())
  //   //   .then(json => {
  //   //     this.setState({
  //   //       projects: json
  //   //     });
  //   //   })
  //   //   .catch(error => console.error(error));
  // }

  componentDidMount() {
    const url = `http://localhost:5000/api/session/csrf`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json && json.csrf) {
          this.setState({
            csrf: json.csrf
          });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { ownedBy, projects, tags } = this.props;

    if (this.state.returnToProjects) {
      return <Redirect to={`/projects/${ownedBy}`} />;
    }

    const projectsOptions = projects.map(function(project) {
      return (
        <Option value={project.id} key={project.id}>
          {project.title}
        </Option>
      );
    });

    var tagOptions;

    if (tags) {
      tagOptions = tags.map(function(tag) {
        return (
          <Option value={tag.label} key={tag.id}>
            {tag.label}
          </Option>
        );
      });
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const config = {
      rules: [{ type: 'object', message: 'Please select time!' }]
    };

    return (
      <div>
        {/* <PageHeader title="Login" content={content} /> */}
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message:
                    "You cannot have a task with no title! What's the point?"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Due">
            {getFieldDecorator('duedate_at', config)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Remind me">
            {getFieldDecorator('remindable', { valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Tag">
            {getFieldDecorator('tags', {
              rules: [
                {
                  message: 'Create a new tag or use one below',
                  type: 'array'
                }
              ]
            })(
              <Select mode="multiple" placeholder="Use a tag">
                {tagOptions}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Project" hasFeedback>
            {getFieldDecorator('project', {
              initialValue: ownedBy,
              rules: [{ required: true, message: 'Please select a project' }]
            })(
              <Select placeholder={`Please select a project`}>
                {projectsOptions}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Notes">
            {getFieldDecorator('notes')(<TextArea rows={4} />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
        <ButtonGroup>
          <Button type="danger" onClick={this.handleArchiveTask}>
            Archive
          </Button>
          <Button type="danger" onClick={this.handleDestroyTask}>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

const DVTaskViewComponent = Form.create({
  mapPropsToFields(props) {
    // console.log('mapPropsToFields', props);
    // const { task } = props.task;

    var notes;

    if (props.task && props.task.notes) {
      notes = props.task.notes.map(note => {
        return note.content;
      });
    }

    return {
      title: Form.createFormField({
        value: props.task.title
      }),
      remindable: Form.createFormField({
        value: props.task.remindable
      }),
      notes: Form.createFormField({
        value: notes
      }),
      duedate_at: Form.createFormField({
        value: moment.utc(props.task.duedate_at)
      }),
      projects: Form.createFormField({
        values: props.projects
      }),
      tags: Form.createFormField({
        values: props.tags
      })
    };
  }
})(TaskViewComponent);

// export default DVTaskViewComponent;
export default class extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {state => (
          <DVTaskViewComponent
            {...this.props}
            currentUser={state.currentUser}
            jwt={state.getToken()}
          />
        )}
      </UserContext.Consumer>
    );
  }
}
