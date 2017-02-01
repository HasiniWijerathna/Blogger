import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {browserHistory} from 'react-router';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {get, httDelete} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import {getSession} from '../services/SessionService';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router';
/**
 * Representing the logic of presenting existing posts belogs to the blog
 */
class BlogPage extends Component {

/**
 * Navigates to the relevent post of the selected blog
 * @param  {Integer} blogId The blog ID
 * @param  {Integer} postId The post ID
 */
  static onPostClick(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
  }
/**
* Navigates to the new post of the selcted blog
* @param {Integer} blogId The blog ID
*/
  static addNewPost(blogId) {
    const authenticated = getSession().authenticated;
    if(authenticated) {
      const loggedUser = getSession().user.id;
      const blogAddedUser = this.state.blog.UserId;
      if (blogAddedUser == loggedUser) {
        browserHistory.push(`/blogs/${blogId}/posts/new`);
      } else {
        this.setState({
          open: true,
          errorMessage: 'Invalied user',
        });
      }
    } else {
      browserHistory.push('login');
    }
  }
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);
    this.state = {
      // blog: getBlogById(parseInt(props.params.blogId))
      // blog: existingBlog,
      dataLoading: true,
      blog: {},
      open: false,
      errorMessage: '',
    };

    this.fetchBlog = this.fetchBlog.bind(this);

    this.fetchBlog(this.props.params.blogId);
  }
/**
* Fetches a blog
* @param  {Integer} blogId The blogId
* @return {Event}          Sends a GET request
*/
  fetchBlog(blogId) {
    const url = modelURL('blog', blogId);

    return get(url)
      .then((response) => {
        this.setState({
          dataLoading: false,
          blog: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          dataLoading: true,
          blog: {},
          open: true,
        });
      });
  }
/**
 * Delets a selected post
 */
  onDeleteBlog() {
    const blogId = this.state.blog.id;
    const url = modelURL('blog', blogId);
    httDelete(url)
      .then((response) => {
        this.setState({
          post: {},
          dataLoading: true,
        });
        browserHistory.push('blogs');
        // refresh
      })
      .catch((error) => {
        this.setState({
          blog: {},
          dataLoading: false,
        });
        browserHistory.push('blogs');
      });
  }
  /**
   * Hides the snackbar when the user clicks it
   */
  handleRequestClose() {
    this.setState({
      open: false,
      errorMessage: '',
    });
  }
/**
* Describes the elements on the Blog page
* @return {String} HTML elements
*/
  render() {
    const blog = this.state.blog;
    const addNewPost = BlogPage.addNewPost.bind(this, blog.id);
    const onDeleteBlog = this.onDeleteBlog.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    let posts = [];

    const buttonStyle = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      marginBottom: '10px',
      zIndex: 99999,
    };

    if(blog.Posts && blog.Posts.length) {
      posts = blog.Posts.map((post) => {
        const onPostClick = BlogPage.onPostClick.bind(this, blog.id, post.id);

        return (
          <div key={`${blog.id}-${post.id}`}>
              <Card key={`${blog.id}-${post.id}`}>
                <CardTitle title={post.id} subtitle={post.content} />
                <CardActions>
                  <RaisedButton label="Leave a comment" onClick={onPostClick} />
                </CardActions>
              </Card>
            </div>
        );
      });
    }

    let deleteAction = null;
    const authenticated = getSession().authenticated;
    if (authenticated) {
      const loggedUser = getSession().user.id;
      const blogAddedUser = this.state.blog.UserId;
      if(loggedUser == blogAddedUser) {
        deleteAction = <RaisedButton label="Delete Posts" primary onClick={onDeleteBlog}/>;
      }
    }

    return (
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.errorMessage}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <List>
          <Subheader>Postes</Subheader>
          {posts}
          {deleteAction}
        </List>
        <FloatingActionButton
          style={buttonStyle}
          onClick={addNewPost}
          >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

BlogPage.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default BlogPage;
