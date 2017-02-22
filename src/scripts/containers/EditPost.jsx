import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {post, get, put} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
/**
 * Representing the logic of adding new posts functionality
 */
class EditPost extends Component {
  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        rteContent: RichTextEditor.createEmptyValue(),
        open: false,
        errorMessage: '',
        // rteContent: RichTextEditor.createValueFromString( '', 'markdown'),
      },
    };
    this.getPostContent = this.getPostContent.bind(this);
  }
  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.getPostContent();
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
   * [contentOnChange description]
   * @param  {[type]} value [description]
   */
  contentOnChange(value) {
    const post = this.state.post;
    post.rteContent = value;
    this.setState({
      post,
    });
  };
  /**
  * Adds new posts
  */
  onAddPost() {
    const postId = this.props.routeParams.postId;
    const url = modelURL('post', postId);
    const blogId = this.props.routeParams.blogId;
    const data = {
      title: this.state.post.title,
      content: this.state.post.rteContent.toString('markdown'),
    };
    put(url, data)
    .then(() => {
      browserHistory.push(`/blogs/${blogId}`);
    })
    .catch((error) =>{
      this.setState({
        post,
      });
    });
  }
/**
 * Sends a GET request to get the editing post content
 * @return {[type]} [description]
 */
  getPostContent() {
    const postId = this.props.routeParams.postId;
    const url = modelURL('post', postId);
    return get(url)
    .then((responce) => {
      this.setState({
        post: {
          title: responce.data.title,
          rteContent: RichTextEditor.createValueFromString( responce.data.content, 'markdown'),
        },
      });
    })
    .catch((error) => {
      browserHistory.push(`/blogs/${blogId}`);
    });
  }
 /**
  * Describes the elements on the Add new post page
  * @return {String} HTML elements
  */
  render() {
    const contentOnChange = this.contentOnChange.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const onAddPost = this.onAddPost.bind(this);
    const buttonStyle = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      marginBottom: '205px',
      marginRight: '60px',
    };
    return(
      <div>
        <div className="col-md-12">
          <div className="floatingLabelText">
            <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} fullWidth/>
          </div>
          <RichTextEditor value={this.state.post.rteContent} onChange={contentOnChange}/>
          <div></div>
          <div>
            <RaisedButton
              label="Publish"
              primary
              onClick={onAddPost}
              style={buttonStyle} />
          </div>
        </div>
      </div>
    );
  }

}
EditPost.propTypes = {
  post: React.PropTypes.object,
  routeParams: React.PropTypes.object.isRequired,
};
export default EditPost;
