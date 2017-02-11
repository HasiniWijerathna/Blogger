import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {browserHistory} from 'react-router';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import Snackbar from 'material-ui/Snackbar';
import {SocialIcon} from 'react-social-icons';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import {get, httDelete} from '../services/Requests';
import {modelURL, modelLikeURL} from '../services/urlFactory';
import {getSession} from '../services/SessionService';
import {post} from '../services/Requests';
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
      count: null,
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
   * Gets the count of the likes
   */
  getCount() {
    const blogId = this.state.blog.id;
    const baseURL = modelURL('blog', blogId, 'like');
    const url = modelLikeURL(baseURL);
    post(url)
    .then(() => {
      console.log('count');
      this.setState({
        count: 1,
      });
    })
    .catch((error) =>{
      console.log('error');
    });
    // this.setState({
    //   count: this.state.count + 1,
    // });
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
    const getCount = this.getCount.bind(this);
    let posts = [];

    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      marginBottom: '10px',
      zIndex: 99999,
    };

    const deleteButtonStyle = {
      marginLeft: '100px',
    };

    const iconButton = {
      marginLeft: '550px',
    };

    if(blog.Posts && blog.Posts.length) {
      posts = blog.Posts.map((post) => {
        const onPostClick = BlogPage.onPostClick.bind(this, blog.id, post.id);
        const postContent = <div> <ReactMarkdown source={post.content || ''} /></div>;
        return (
          <div key={`${blog.id}-${post.id}`}>
              <Card key={`${blog.id}-${post.id}`}>>
                <CardTitle>
                  {post.title}
                  {postContent}
                </CardTitle>
                  <CardActions>
                    <RaisedButton label="View Post" onClick={onPostClick} />
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
        deleteAction = <RaisedButton label="Delete Blog" onClick={onDeleteBlog} style={deleteButtonStyle}/>;
      }
    }
    let count = <div> <IconButton tooltip={this.state.count}
     touch={true} style={iconButton} onClick={getCount} >
                   <ActionGrade />
                 </IconButton>

    </div>;
    if(this.state.count ==1) {
      console.log('cliked');
      count = <div> <IconButton tooltip={this.state.count}
       touch={true} style={iconButton} onClick={getCount} disabled >
                     <ActionGrade />
                   </IconButton>

      </div>;
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
          <header>
            {this.state.blog.name}
            {deleteAction}
            <div>
              {count}
            </div>
          </header>
            <Subheader>Postes</Subheader>
              {posts}
          </List>
        <FloatingActionButton
          style={buttonStyle}
          onClick={addNewPost}
          >
          <ContentAdd />
        </FloatingActionButton>
        <div className= "socialIcon">
          <SocialIcon url="http://twitter.com/jaketrent" />
        </div>
      </div>
    );
  }
}

BlogPage.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default BlogPage;
