import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
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
        rteContent: RichTextEditor.createEmptyValue(),
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
      content: this.state.post.rteContent.toString('markdown'),
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
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddPost = this.onAddPost.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const contentOnChange =this.contentOnChange.bind(this);

    const buttonStyle = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      marginBottom: '205px',
      marginRight: '60px',
    };

    return (
      <div className="col-md-12">
        <div className="floatingLabelText">
          <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} fullWidth/>
        </div>
        <div>
          <RichTextEditor value={this.state.post.rteContent} onChange={contentOnChange}/>
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

AddNewPost.propTypes = {
  routeParams: React.PropTypes.object.isRequired,
};

export default AddNewPost;
