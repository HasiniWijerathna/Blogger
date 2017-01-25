import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {browserHistory} from 'react-router';
import {getSession} from '../services/SessionService';

/**
* Represents the comment form functionality
*/
class CommentForm extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      dataLoading: true,
    };
  }
/**
 * [onAddComment description]
 */
  onAddComment() {
    const authenticated = getSession().authenticated;
    if (authenticated) {
      const blogId = this.props.post.BlogId;
      const postId = this.props.post.id;
      const comment = this.state.comment;
      this.props.onAdd(comment);
      browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
      this.setState({
        comment: '',
        dataLoading: true,
      });
    } else {
      browserHistory.push('/login');
    }
  }
/**
* Updates the state with the new value
* @param  {Event} changeEvent Change event
*/
  onChange(changeEvent) {
    const comment = changeEvent.target.value;
    this.setState({
      comment: comment,
    });
  }
/**
* Render all blogs and autoComplete field
* @return {String} Blog list
*/
  render() {
    const onAddComment = this.onAddComment.bind(this);
    const onChange = this.onChange.bind(this);

    return (
      <div>
        <div>Leave a comment </div>
        <TextField floatingLabelText="Comment" value={this.state.comment} onChange={onChange} />
        <RaisedButton label="Save" primary onClick={onAddComment} />
      </div>
    );
  }
}

CommentForm.propTypes = {
  post: React.PropTypes.object.isRequired,
  onAdd: React.PropTypes.func.isRequired,
};

export default CommentForm;
