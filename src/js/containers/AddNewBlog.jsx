import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import Snackbar from 'material-ui/Snackbar';
import {getSession} from '../services/SessionService';
/**
* Represents the view logic of adding new blogs functionality
*/
class AddNewBlog extends Component {

  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        name: '',
      },
      open: false,
      message: '',
    };
    // const blogId = parseInt(props.params.blogId);
  }

  /**
   * [addNewBlog description]
   */
  addNewBlog() {
    const loggedUser = getSession().user.id;
    if (loggedUser) {
      const url = modelURL('blog');
      const data = {
        name: this.state.blog.name,
      };
      post(url, data)
      .then(() => {
        browserHistory.goBack();
      })
      .catch((error) =>{
        this.setState({
          blog: {
            name: '',
          },
          open: true,
          message: 'Plese login to add blogs',
        });
      });
    } else {
      console.log('login!');
    }
  }
/**
* Updates the state according to the change event of the blog name
* @param  {Event} changeEvent  Change event of the blog name
*/
  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const blog = this.state.blog;

    blog.name = newName;
    this.setState({blog});
  }
  /**
   * [handleRequestClos description]
   */
  handleRequestClose() {
    this.setState({
      open: false,
      message: '',
    });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddBlog = this.addNewBlog.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);

    return (
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <p>New blog</p>
        <TextField floatingLabelText="Name" value={this.state.blog.name} onChange={onChangeName} fullWidth/>
        <RaisedButton label="Save" primary onClick={onAddBlog} />
      </div>
    );
  }

}
AddNewBlog.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default AddNewBlog;
