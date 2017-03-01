import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import Snackbar from 'material-ui/Snackbar';
import {getSession} from '../services/SessionService';
import {get} from '../services/Requests';
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
        category: '',
      },
      open: false,
      message: '',
      value: 1,
      category: {},
    };
  }
  /**
   * Allows logged users to add blogs
   */
  addNewBlog() {
    const loggedUser = getSession().user.id;
    if(!this.state.blog.name && !this.state.blog.category) {
      this.setState({
        blog: {
          name: '',
          category: '',
        },
        open: true,
        message: 'Blog name and category can not be empty',
      });
    } else if (loggedUser) {
      const url = modelURL('blog');
      const data = {
        name: this.state.blog.name,
        category: this.state.value,
      };
      post(url, data)
      .then(() => {
        browserHistory.goBack();
        console.log(data);
      })
      .catch((error) =>{
        this.setState({
          blog: {
            name: '',
            category: '',
          },
          open: true,
          message: 'Plese login to add blogs',
        });
      });
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
* Updates the state according to the change event of the category
* @param  {Event} event  Change event of the blog name
* @param  {Integer} index  Change event of the category index
* @param  {String} value  Change event of the category
*/
  handleChangeList(event, index, value) {
    this.setState({value});
  }
/**
 * Hides the snackbar when the user clicks it
 */
  handleRequestClose() {
    this.setState({
      open: false,
      message: '',
    });
  }
/**
* Gets all the blog categories
* @return {Event}   Sends a GET request
*/
  getCategory() {
    const url = modelURL('blogCategory');
    console.log(url);
    return get(url)
      .then((response) => {
        console.log(response);
        this.setState({
          category: response.data,
        });
      })
      .catch((error) => {
      console.log('error');
      });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    this.getCategory();
    const onAddBlog = this.addNewBlog.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const handleChangeList = this.handleChangeList.bind(this);

    return (
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <div>
          <p>New blog</p>
          <TextField floatingLabelText="Name" value={this.state.blog.name} onChange={onChangeName} fullWidth/>
        </div>
        <div> <p>Select a blog category</p></div>
        <div>
          <SelectField
            floatingLabelText="Education"
            value={this.state.value}
            onChange={handleChangeList}
            autoWidth={true}
          >
            <MenuItem value={1} primaryText="Technology" />
            <MenuItem value={2} primaryText="Entertainment" />
            <MenuItem value={3} primaryText="Photography" />
            <MenuItem value={4} primaryText="Music" />
            <MenuItem value={5} primaryText="Travel" />
            <MenuItem value={6} primaryText="Life Style" />
            <MenuItem value={7} primaryText="Food" />
            <MenuItem value={8} primaryText="Beauty" />
            <MenuItem value={9} primaryText="Sports" />
          </SelectField>
        </div>
        <RaisedButton label="Save" primary onClick={onAddBlog} />
      </div>
    );
  }

}
AddNewBlog.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default AddNewBlog;
