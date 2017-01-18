import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
      value: '',
    };
  }
/**
* Updates the state with the new value
* @param  {Event} changeEvent Change event
*/
  onChange(changeEvent) {
    const newValue = changeEvent.target.value;
    this.setState({
      value: newValue,
    });
  }
/**
* Sends the new comment to the addComment function
*/
  onAdd() {
    this.props.onAdd(this.state.value);

    this.setState({
      value: '',
    });
  }

/**
* Render all blogs and autoComplete field
* @return {String} Blog list
*/
  render() {
    const addComment = this.onAdd.bind(this);
    const onChange = this.onChange.bind(this);

    return (
      <div>
        <div>Leave a comment </div>
        <TextField floatingLabelText="Comment" value={this.state.value} onChange={onChange} />
        <RaisedButton label="Save" primary onClick={addComment} />
      </div>
    );
  }
}

CommentForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
};

export default CommentForm;
