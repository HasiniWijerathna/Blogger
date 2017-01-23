import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';

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
    const comment = this.state.comment;
    this.props.onAdd(comment);
    // const url = modelURL('comment');
    // const data = {
    //   comment: this.state.comment,
    //   postId: this.props.post.id,
    // };
    // post(url, data)
    // .then((response) => {
    //   this.setState({
    //     comment: response.data.comment,
    //     dataLoading: true,
    //   });
    //   browserHistory.push('/home');
    // })
    // .catch((error) =>{
    //   this.setState({
    //     comment: '',
    //     dataLoading: false,
    //
    //   });
    // });
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
* Sends the new comment to the addComment function
*/
  // onAdd() {
  //   this.props.onAdd(this.state.value);
  //
  //   this.setState({
  //     value: '',
  //   });
  // }

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
  routeParams: React.PropTypes.func.isRequired,
};

export default CommentForm;
