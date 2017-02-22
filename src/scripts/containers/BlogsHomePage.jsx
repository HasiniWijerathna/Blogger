import React, {Component} from 'react';
import Subheader from 'material-ui/Subheader';
import {browserHistory} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';
import {List} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {grey700} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';

import {get} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
/**
* Representing the logic of presenting existing blogs
*/
class BlogsHomePage extends Component {

/**
* Navigates to the relevent blog page
* @param  {Integer} blogId Id of the selected blog
*/
  static onBlogClick(blogId) {
    browserHistory.push(`/blogs/${blogId}`);
  }

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      blogsData: [],
      open: false,
      message: '',
      completed: 5000,
      loading: false,
    },

    this.addNewBlog = this.addNewBlog.bind(this);
  }

  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.requestData();
  }

/**
 * Request all data from the API
 */
  requestData() {
    const url = modelURL('blog');

    this.fetchData(url, true);
  }

  /**
  * Abstract function to fetch data from the API
  * @param  {String} url           The URL to GET from
  * @param  {String} isCollection  Indicates whether the returning data set is a collection
  * @param  {Object} params        The params to be passed with the request
  * @return {Promise}              The request promise object
  */
  fetchData(url, isCollection, params) {
    this.setState({
      loading: true,
    });

    return get(url, params)
      .then((response) => {
        this.setState({
          loading: false,
          blogsData: isCollection ? response.data.results : response.data,
        });

        return response.data;
      })
      .catch((error) => {
        this.setState({
          loading: false,
          open: false,
          message: 'Oops something went wrong!',
        });
      });
  }
/**
* Navigates to the Add blogs page
*/
  addNewBlog() {
    browserHistory.push('blogs/new');
  }
/**
 * Hides the snack bar
 */
  handleRequestClose() {
    this.setState({
      open: false,
      message: '',
    });
  }
/**
* Render all blogs and autoComplete field
* @return {String} Blog list
*/
  render() {
    const handleRequestClose = this.handleRequestClose.bind(this);
    const blogName = [];
    this.state.blogsData.map((blog) =>
      blogName.push(blog.name)
    );
    const blogs = this.state.blogsData.map((blog) => {
      const onBlogClick = BlogsHomePage.onBlogClick.bind(this, blog.id);
      const noOfPosts = blog.Posts.length;
      const blogger = [];
      if(blog.User) {
        blogger.push(blog.User.username);
      }
      return (
        <div key={blog.id}>
          <Card>
            <CardHeader
              title="No of posts"
              subtitle={noOfPosts}
            />
            <CardTitle title={blog.name} subtitle= {blogger} />
            <CardActions>
              <RaisedButton label="Click here for posts" onClick={onBlogClick} />
            </CardActions>
          </Card>
        </div>
      );
    });

    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      marginBottom: '10px',
      zIndex: 99999,
    };
    const styles = {
      underlineStyle: {
        borderColor: grey700,
      },
      floatingLabelStyle: {
        color: grey700,
      },
    };

    let content =null;
    const loading = this.state.loading;
    if(loading) {
      content=(
        <LinearProgress mode="indeterminate"/>
      );
    } else {
      content =(
        <div>
          <div>
            <AutoComplete
             floatingLabelText="Search Blogs"
             floatingLabelStyle = {styles.floatingLabelStyle}
             underlineFocusStyle={styles.underlineStyle}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={blogName}
              onNewRequest={this.addNewBlog}
              fullWidth
            />
          </div>
          <List>
            <Subheader>Blogs</Subheader>
            {blogs}
          </List>
          <FloatingActionButton onClick={this.addNewBlog} style={buttonStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      );
    }

    return (
      <div className =".app.blogList">
        <Snackbar
         open={this.state.open}
         message={this.state.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <div>{content}</div>
      </div>
    );
  }
}

export default BlogsHomePage;
