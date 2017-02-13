import React, {Component} from 'react';
import {findIndex} from 'lodash';
import {browserHistory} from 'react-router';
import ReactMarkdown from 'react-markdown';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

import {get, post, put, httDelete} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import {getSession} from '../services/SessionService';

/**
 * Representing the logic of adding new posts
 */
class PostPage extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      dataLoading: true,
    };
    this.fetchPost = this.fetchPost.bind(this);

    this.fetchPost(this.props.params.postId);
  }
/**
* Fetches the post by it's ID
* @param  {Integer} postId [description]
* @return {Requests}        [description]
*/
  fetchPost(postId) {
    const url = modelURL('post', postId);
    return get(url)
     .then((response) => {
       this.setState({
         post: response.data,
         dataLoading: false,
       });
     })
     .catch((error) => {
       this.setState({
         post: {},
         dataLoading: false,
       });
     });
  }

/**
* Callback function for deleting comment
* @param  {object} comment The deleting comment object
*/
  onCommentDelete(comment) {
    const commentId = comment.id;
    const url = modelURL('comment', commentId);
    httDelete(url)
      .then((response) => {
        this.setState({
          post: {},
          dataLoading: true,
        });
        this.fetchPost(this.props.params.postId);
      })
      .catch((error) => {
        this.setState({
          blog: {},
          dataLoading: false,
        });
      });
  }

/**
* Callback function for editing comment
* @param  {object} editingComment The editng comment object
* @param  {string} newValue       New comment
*/
  onCommentEdit(editingComment, newValue) {
    const post = this.state.post;
    const comments = post.Comments;
    const index = findIndex(comments, (comment) => editingComment.id === comment.id);
    if (index > -1) {
      comments[index].comment = newValue;
      const commentId = comments[index].id;
      const url = modelURL('comment', commentId);
      const data = {
        comment: newValue,
      };
      put(url, data)
      .then((response) => {
        browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
      })
      .catch((error) =>{
        console.log(error);
      });
    }
  }

/**
* Callback function for adding comment
* @param  {object} value The adding comment
*/
  onCommentAdd(value) {
    const authenticated = getSession().authenticated;
    if (authenticated) {
      const url = modelURL('comment');
      const data = {
        comment: value,
        postId: this.state.post.id,
      };
      post(url, data)
      .then((response) => {
        this.setState({
          comment: response.data.comment,
          dataLoading: true,
        });
        this.fetchPost(this.props.params.postId);
      })
      .catch((error) =>{
        this.setState({
          comment: '',
          dataLoading: false,

        });
      });
    } else {
      browserHistory.push('/login');
    }
  }
/**
* Render the elements on the Post page
* @return {String} HTML elements
*/
  render() {
    const onCommentDelete = this.onCommentDelete.bind(this);
    const onCommentEdit = this.onCommentEdit.bind(this);
    const onCommentAdd = this.onCommentAdd.bind(this);

    const post = this.state.post;
    let comments = [];
    if(post.Comments && post.Comments.length) {
      comments = post.Comments.map((comment) =>
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onCommentDelete}
          onEdit={onCommentEdit}
        />
    );
    }
    const reactSource = '';
    this.reactSurce = post.content;
    const postContent = <div> <ReactMarkdown source={reactSource} /></div>;
    return (
      <div>
        <Card key={post.id}>
          <CardTitle>{post.title}</CardTitle>
          <CardText>{postContent}</CardText>
        </Card>
        <CardTitle>Comments</CardTitle>
        <div>{comments}</div>
        <div>
          <CommentForm onAdd={onCommentAdd} post={this.state.post} />
        </div>
      </div>
    );
  }
}

PostPage.propTypes = {
  params: React.PropTypes.object,
};

PostPage.defaultProps = {
  params: {},
};

export default PostPage;
