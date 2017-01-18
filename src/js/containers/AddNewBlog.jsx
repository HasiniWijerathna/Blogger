import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {addBlog} from '../services/BlogService';

/**
* Represents the view logic of adding new blogs functionality
*/
class AddNewBlog extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      blog: {
        name: '',
        author: '',
      },
    };
  }
/**
* Adds new blogs
*/
  onAdd() {
    const newBlog = this.state.blog;
    addBlog(newBlog);
    browserHistory.goBack();
  }
/**
* Updates the state according to the change event of the blog name
* @param  {Event} changeEvent  Change event of the blog name
*/
  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const blog = this.state.blog;

    blog.name = newName;
    this.setState({blog});
  }

/**
* Updates the state according to the change event of thr blog author
* @param  {Event} changeEvent  Change event of the blog author
*/
  onChangeAuthor(changeEvent) {
    const newAuthor = changeEvent.target.value;
    const blog = this.state.blog;

    blog.author = newAuthor;
    this.setState({blog});
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
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
