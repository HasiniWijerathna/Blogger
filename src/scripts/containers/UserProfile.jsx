import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/action/class';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/create';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import {getSession} from '../services/SessionService';
import {browserHistory} from 'react-router';
import {get} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
/**
* Represents the view logic of User Profile functionality
*/
class UserProfile extends Component {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      posts: [],
    };
    this.fetchUserBlogs = this.fetchUserBlogs.bind(this);
  }
/**
 * Called after the component is mounted
 */
  componentDidMount() {
    this.fetchUserBlogs();
  }
/**
 * Navigate to the edit profile page
 */
  navigateEditProfile() {
    browserHistory.push('/editProfile');
  }
/**
 * Fetches all the blogs and posts belongs to a user
 * @return {Event}              Sends a GET request
 */
  fetchUserBlogs() {
    const userId = getSession().user.id;
    const url = modelURL('user', userId);

    return get(url)
     .then((response) => {
       this.setState({
         blogs: response.data.Blogs,
       });
     })
     .catch((error) => {
       console.log(error);
     });
  }
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    console.log(this.state.blogs);
    const imageStyle = {
      height: '400px',
    };
    const overlayStyle = {
      height: '90px',
    };
    const listStyle = {
      width: '300px',
    };
    const cardStyle = {
      position: 'absolute',
      right: 0,
    };
    const blogs = this.state.blogs.map((blog) => {
      return(
        <div key={blog.id}>
          <Card>
            <CardTitle title={blog.name} />
            <CardActions>
              <RaisedButton label="Click here for posts" />
            </CardActions>
          </Card>
        </div>
      );
    });
    const bloggerName = getSession().user.name;
    const list = getSession().user.createdAt.split(':');
    const createdAt = list[0];
    const date = createdAt.split('-');
    const year = date[0];
    const month = date[1];
    const memberSince = `Member since : ${month}-${year}`;
    return(
      <div>
        <div id="profileCard">
          <Card>
            <CardMedia
             overlay={
               <CardHeader
                 id="cardHeader"
                 style={overlayStyle}
                 title={bloggerName}
                 subtitle={memberSince}
                 avatar="https://cdn2.iconfinder.com/data/icons/rcons-user/32/female-shadow-fill-circle-256.png "
              />
            }>
              <img src="https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg" style={imageStyle} />
            </CardMedia>
          </Card>
        </div>
        <List style ={listStyle}>
          <Subheader>Great stories deserve a great audience</Subheader>
          <ListItem
          primaryText="Start Reading" leftIcon={<ContentSend />}
        />
          <ListItem primaryText="Blogs" leftIcon={<ContentDrafts />} />
          <ListItem primaryText="Posts" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Likes" leftIcon={<ActionGrade />} />
        </List>
        <card >
          {blogs}
        </card>
      </div>
    );
  }
}
export default UserProfile;
