import React, {Component} from 'react';

import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import ReactMarkdown from 'react-markdown';
import {Card, CardText} from 'material-ui/Card';
/**
 * Representing the logic of adding new posts functionality
 */
class AddNewPost extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        content: '',
      },
    };
  }

/**
* Adds new posts
*/
  onAddPost() {
    const url = modelURL('post');
    const data = {
      blogId: this.props.routeParams.blogId,
      title: this.state.post.title,
      content: this.state.post.content,
    };
    post(url, data)
    .then(() => {
      browserHistory.push(`/blogs/${data.blogId}`);
    })
    .catch((error) =>{
      this.setState({
        post,
      });
    });
  }
/**
* Updates the state according to the change event of new title of the post
* @param  {Event} changeEvent The change event of the post title
*/
  onChangeTitle(changeEvent) {
    const newTitle = changeEvent.target.value;
    const post = this.state.post;

    post.title = newTitle;

    this.setState({
      post,
    });
  }

/**
* Updates the state according to the change event of new content of the post
* @param  {Event} changeEvent The change event of the post content
*/
  onChangeContent(changeEvent) {
    const newContent = changeEvent.target.value;
    const post = this.state.post;

    post.content = newContent;

    this.setState({
      post,
    });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddPost = this.onAddPost.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const onChangeContent = this.onChangeContent.bind(this);

    const contentCardStyle = {
      position: 'right',
      display: 'block',
      width: '52%',
      paddingBottom: '100px',
      transitionDuration: '0.3s',
      float: 'left',
      height: '560px',
    };
    const previewCardStyle = {
      position: 'right',
      display: 'block',
      width: '47%',
      paddingBottom: '665px',
      transitionDuration: '0.3s',
      float: 'right',
      height: '480px',
    };

    return (
      <div>
        <Card style={contentCardStyle}>
        <div>
        <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} fullWidth/>
        </div>
        <div className="col-md-6">
          <TextField
            floatingLabelText="Post content"
            multiLine={true}
            rows={20}
            value={this.state.post.content}
            onChange={onChangeContent}
            fullWidth
          />
          <RaisedButton label="Save" primary onClick={onAddPost} />
        </div>
        </Card>
        <Card style={previewCardStyle}>
          <ReactMarkdown source={this.state.post.content} />
        </Card>
      </div>
    );
  }
}

AddNewPost.propTypes = {
  routeParams: React.PropTypes.object.isRequired,
};

export default AddNewPost;
