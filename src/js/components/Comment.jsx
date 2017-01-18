import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';

class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editingComment: ''
    };
  }

  onDelete() {
    this.props.onDelete(this.props.comment);
  }

  onEdit(comment) {
    this.setState({
      editMode: true,
      editingComment: comment.comment
    });
  }

  onSave(comment) {
    this.props.onEdit(comment, this.state.editingComment);

    this.setState({
      editMode: false,
      editingComment: ''
    });
  }

  onCancel() {
    this.setState({
      editMode: false,
      editingComment: ''
    });
  }

  onChange(event) {
    this.setState({
      editingComment: event.target.value
    });
  }

  render() {
    const deleteComment = this.onDelete.bind(this);
    const onEdit = this.onEdit.bind(this, this.props.comment);
    const onSave = this.onSave.bind(this, this.props.comment);
    const onCancel = this.onCancel.bind(this);
    const onChange = this.onChange.bind(this);

    let body = null;

    if (this.state.editMode) {
      body = (
        <div>
          <TextField
            floatingLabelText="Edit comment"
            value={this.state.editingComment}
            onChange={onChange}
          />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem primaryText="Save" onClick={onSave} />
            <MenuItem primaryText="Cancel" onClick={onCancel} />
          </IconMenu>
        </div>
      );
    } else {
      body = (
        <div>
          <label htmlFor="commment">{this.props.comment.comment}</label>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Delete" onClick={deleteComment} />
            <MenuItem primaryText="Edit" onClick={onEdit} />
          </IconMenu>
        </div>
      );
    }
    return body;
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};

export default Comment;
