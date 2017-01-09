import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange(changeEvent) {
    const newValue = changeEvent.target.value;
    this.setState({
      value: newValue
    });
  }

  onAdd() {
    this.props.onAdd(this.state.value);

    this.setState({
      value: ''
    });
  }


  render() {
    let addComment = this.onAdd.bind(this);
    let onChange = this.onChange.bind(this);

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
  onAdd: React.PropTypes.func
};

export default CommentForm;
