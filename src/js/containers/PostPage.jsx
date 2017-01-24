import React, {Component} from 'react';

import {findIndex} from 'lodash';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

import {get, post, put, httDelete} from '../services/Requests';
import {modelURL} from '../services/urlFactory';

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
      // post: getPostById(parseInt(props.params.blogId), parseInt(props.params.postId)),
      post: {},
      dataLoading: true,
    };
    this.fetchPost = this.fetchPost.bind(this);

    this.fetchPost(this.props.params.postId);
  }
/**
* [fetchPost description]
* @param  {[type]} postId [description]
* @return {[type]}        [description]
*/
  fetchPost(postId) {
    const url = modelURL('post', postId);
    console.log(url);
    return get(url)
     .then((response) => {
       this.setState({
         post: response.data,
         dataLoading: false,
       });
     })
     .catch((error) => {
       console.log(error);
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
    console.log('delete');
    const commentId = comment.id;
    // const filteredComments = post.comments.filter((stateComment) => stateComment.id !== comment.id);
    //
    // post.comments = filteredComments;
    //
    // this.setState({
    //   post,
    // });
    console.log(commentId);
    const url = modelURL('comment', commentId);
    httDelete(url)
      .then((response) => {
        this.setState({
          post: {},
          dataLoading: true,
        });
        this.fetchPost(this.props.params.postId);
        // refresh
      })
      .catch((error) => {
        console.log(error);
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
    // console.log('onEdit');
    // console.log(editingComment.comment);
    // console.log(newValue);
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
        console.log(response.data);
        browserHistory.push('/home');
      })
      .catch((error) =>{
        console.log('error');
        console.log(error);
      });
    }
  }

/**
* Callback function for adding comment
* @param  {object} value The adding comment
*/
  onCommentAdd(value) {
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
      // browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
    })
    .catch((error) =>{
      this.setState({
        comment: '',
        dataLoading: false,

      });
    });

    // const post = this.state.post;
    // const comments = post.comments;
    // let commentId = 1;
    //
    // if (comments && comments.length) {
    //   commentId = comments[comments.length - 1].id + 1;
    // }
    //
    // comments.push({
    //   id: commentId,
    //   comment: value,
    // });
    //
    // this.setState({
    //   post,
    // });
    // this.setState({comments: comments});
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
    return (
      <div>

        <List>
          <ListItem
            key={post.id}
            primaryText={post.title}
            secondaryText={post.content}
          />
          <Subheader>Comments</Subheader>
          <List>
            {comments}
          </List>
        </List>
        <CommentForm onAdd={onCommentAdd} post={this.state.post} />
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
