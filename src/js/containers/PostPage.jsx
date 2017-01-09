import React, { Component } from 'react';
import { findIndex } from 'lodash';

import { getPostById } from '../services/BlogService';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class PostPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: getPostById(parseInt(props.params.blogId), parseInt(props.params.postId))
    };
  }

  /**
   * Callback function for deleting comment
   * @param  {object} comment The deleting comment object
   */
  onCommentDelete(comment) {
    const post = this.state.post;
    const filteredComments = post.comments.filter(stateComment => stateComment.id !== comment.id);

    post.comments = filteredComments;

    this.setState({
      post
    });
  }

  /**
   * Callback function for editing comment
   * @param  {object} editingComment The editng comment object
   * @param  {string} newValue       New comment
   */
  onCommentEdit(editingComment, newValue) {
    const post = this.state.post;
    const comments = post.comments;
    const index = findIndex(comments, comment => comment.id === editingComment.id);

    if (index > -1) {
      comments[index].comment = newValue;

      this.setState({
        post
      });
    }
  }

  /**
   * Callback function for adding comment
   * @param  {object} value The adding comment
   */
  onCommentAdd(value) {
    const post = this.state.post;
    const comments = post.comments;
    let commentId = 1;

    if (comments && comments.length) {
      commentId = comments[comments.length - 1].id + 1;
    }

    comments.push({
      id: commentId,
      comment: value
    });

    this.setState({
      post
    });
    // this.setState({comments: comments});
  }


  render() {
    let onCommentDelete = this.onCommentDelete.bind(this);
    let onCommentEdit = this.onCommentEdit.bind(this);
    let onCommentAdd = this.onCommentAdd.bind(this);

    const post = this.state.post;
    const comments = post.comments.map(comment =>
      <Comment
        key={comment.id}
        comment={comment}
        onDelete={onCommentDelete}
        onEdit={onCommentEdit}
      />
    );

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
        <CommentForm onAdd={onCommentAdd} />

      </div>
    );
  }
}

PostPage.propTypes = {
  params: React.PropTypes.object
};

export default PostPage;
