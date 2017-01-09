import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { addPost } from '../services/BlogService';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddNewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        author: '',
        content: ''
      }
    };
  }

  onChangeTitle(changeEvent) {
    const newTitle = changeEvent.target.value;
    const post = this.state.post;

    post.title = newTitle;

    this.setState({
      post
    });
  }

  onChangeAuthor(changeEvent) {
    const newAuthor = changeEvent.target.value;
    const post = this.state.post;

    post.author = newAuthor;

    this.setState({
      post
    });
  }

  onChangeContent(changeEvent) {
    const newContent = changeEvent.target.value;
    const post = this.state.post;

    post.content = newContent;

    this.setState({
      post
    });
  }

  onAdd() {
    const bolgId = parseInt(this.props.params.blogId);
    const newPost = this.state.post;

    addPost(bolgId, newPost);
    browserHistory.goBack();
  }

  render() {
    let onAddPost = this.onAdd.bind(this);
    let onChangeTitle = this.onChangeTitle.bind(this);
    let onChangeAuthor = this.onChangeAuthor.bind(this);
    let onChangeContent = this.onChangeContent.bind(this);

    return (
      <div>
        <div>
          <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} />
        </div>
        <div>
          <TextField floatingLabelText="Author" value={this.state.post.author} onChange={onChangeAuthor} />
        </div>
        <div>
          <TextField floatingLabelText="content" value={this.state.post.content} onChange={onChangeContent} />
        </div>
        <RaisedButton label="Save" primary onClick={onAddPost} />
      </div>
    );
  }
}

AddNewPost.propTypes = {
  params: React.PropTypes.object
};

export default AddNewPost;
