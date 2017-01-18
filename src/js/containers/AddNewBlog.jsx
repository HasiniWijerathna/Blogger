import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {addBlog} from '../services/BlogService';

/**
 * Represents the view logic of adding new blogs functionality
 */
class AddNewBlog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blog: {
        name: '',
        author: ''
      }
    };
  }

  onAdd() {
    const newBlog = this.state.blog;
    addBlog(newBlog);
    browserHistory.goBack();
  }

  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const blog = this.state.blog;

    blog.name = newName;
    this.setState({ blog });
  }

  onChangeAuthor(changeEvent) {
    const newAuthor = changeEvent.target.value;
    const blog = this.state.blog;

    blog.author = newAuthor;
    this.setState({ blog });
  }

  render() {
    const onAddBlog = this.onAdd.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const onChangeAuthor = this.onChangeAuthor.bind(this);

    return (
      <div>
        <p>New blog</p>
        <TextField floatingLabelText="Name" value={this.state.blog.name} onChange={onChangeName} />
        <div>
          <TextField floatingLabelText="Author" value={this.state.blog.author} onChange={onChangeAuthor} />
        </div>
        <RaisedButton label="Save" primary onClick={onAddBlog} />
      </div>
    );
  }

}
export default AddNewBlog;
