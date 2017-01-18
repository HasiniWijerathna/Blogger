import React, {Component} from 'react';

import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {addPost} from '../services/BlogService';

/**
 * Representing the logic of adding new posts functionality
 */
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
    const onAddPost = this.onAdd.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const onChangeAuthor = this.onChangeAuthor.bind(this);
    const onChangeContent = this.onChangeContent.bind(this);

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
  params: React.PropTypes.object.isRequired
};

export default AddNewPost;
