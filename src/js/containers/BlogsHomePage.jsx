import React, {Component} from 'react';
import Subheader from 'material-ui/Subheader';
import {browserHistory} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';
import {List} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import axios from 'axios';

import {getAllBlogs} from '../services/BlogService';

/**
 * Representing the logic of presenting existing blogs
 */
class BlogsHomePage extends Component {

/**
 * Navigates to the Blog page
 */
  static addNewBlog() {
    browserHistory.push('/blogs/new');
  }

/**
 * Navigates to the relevent blog page
 * @param  {Integer} blogId Id of the selected blog
 */
  static onBlogClick(blogId) {
    browserHistory.push(`/blogs/${blogId}`);
  }

/**
 * Class constructor
 * @param  {[type]} props [description]
 */
  constructor(props) {
    super(props);
    // const allBlogs = axios.get('http://localhost:3000/blogs/')
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    this.state = {
      blogs: getAllBlogs(),
    };
  }
/**
 * Render all blogs and autoComplete field
 * @return {String} Blog list
 */
  render() {
    const blogName = [];
    this.state.blogs.map((blog) =>
      blogName.push(blog.name)
    );
    const blogs = this.state.blogs.map((blog) => {
      const onBlogClick = BlogsHomePage.onBlogClick.bind(this, blog.id);
      const x = blog.posts.length;
      return (
        <div key={blog.id}>
          <Card>
            <CardHeader
              title="No of posts"
              subtitle={x}
            />
            <CardTitle title={blog.name} subtitle={blog.author} />
            <CardActions>
              <RaisedButton label="Click here for posts" onClick={onBlogClick} />
            </CardActions>
          </Card>
        </div>
      );
    });

    return (
      <div>
        <div>
          <AutoComplete
            floatingLabelText="Search Blogs"
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
        <FloatingActionButton onClick={this.addNewBlog} style={this.style}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default BlogsHomePage;
