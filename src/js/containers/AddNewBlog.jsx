import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {addBlog} from '../services/BlogService';
import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';

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
    };
    // const blogId = parseInt(props.params.blogId);
  }
/**
 * [addNewBlog description]
 */
  addNewBlog() {
    const url = modelURL('blog');
    console.log(url);
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
      });
    });
  }
/**
* Adds new blogs
*/
  // onAdd() {
  //   const newBlog = this.state.blog;
  //   addBlog(newBlog);
  //   browserHistory.goBack();
  // }
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
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddBlog = this.addNewBlog.bind(this);
    const onChangeName = this.onChangeName.bind(this);

    return (
      <div>
        <p>New blog</p>
        <TextField floatingLabelText="Name" value={this.state.blog.name} onChange={onChangeName} />

        <RaisedButton label="Save" primary onClick={onAddBlog} />
      </div>
    );
  }

}
AddNewBlog.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default AddNewBlog;
