import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { getBlogById } from '../services/BlogService';

class BlogPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blog: getBlogById(parseInt(props.params.blogId))
    };
  }

  onPostClick(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
  }

  addNewPost(blogId) {
    browserHistory.push(`/blogs/${blogId}/posts/new`);
  }

  render() {
    const blog = this.state.blog;
    let addNewPost = this.addNewPost.bind(this, blog.id);
    let posts = blog.posts.map(post => {
      let onPostClick = this.onPostClick.bind(this, blog.id, post.id);

      return (
        <Card key={`${blog.id}-${post.id}`}>
          <CardTitle title={post.id} subtitle={post.content} />
          <CardActions>
            <RaisedButton label="Leave a comment" onClick={onPostClick} />
          </CardActions>
        </Card>
      );
    });

    // return (
    //   <div>
    //     {this.state.blog.name}
    //     <div>{this.state.blog.author}</div>
    //       <FloatingActionButton onClick={addNewPost}>
    //   <ContentAdd />
    // </FloatingActionButton>
    //     {posts}
    //   </div>
    // );
    //
    return (
      <div>
        <List>
          <Subheader>Postes</Subheader>
          {posts}
        </List>
        <FloatingActionButton onClick={addNewPost}>
            <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

BlogPage.propTypes = {
  params: React.PropTypes.object
};

export default BlogPage;
