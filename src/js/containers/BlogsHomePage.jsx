import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';
import { List } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { getAllBlogs } from '../services/BlogService';

class BlogsHomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blogs: getAllBlogs()
    };
  }

  onBlogClick(blogId) {
    browserHistory.push(`/blogs/${blogId}`);
  }

  addNewBlog() {
    browserHistory.push('/blogs/new');
  }


  render() {
    const blogName = [];
    this.state.blogs.map(blog =>
      blogName.push(blog.name)
    );
    let addNewBlog = this.addNewBlog.bind(this);
    let blogs = this.state.blogs.map(blog => {
      let onBlogClick = this.onBlogClick.bind(this, blog.id);
      let x = blog.posts.length;
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
              onNewRequest={addNewBlog}
              fullWidth={true}
            />
        </div>
        <List>
          <Subheader>Blogs</Subheader>
          {blogs}
        </List>
        <FloatingActionButton onClick={addNewBlog} style={this.style}>
            <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default BlogsHomePage;
