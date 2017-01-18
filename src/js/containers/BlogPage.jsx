import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {browserHistory} from 'react-router';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

// import { getBlogById } from '../services/BlogService';

/**
 * Representing the logic of presenting existing posts belogs to the blog
 */
class BlogPage extends Component {

  static onPostClick(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
  }

  static addNewPost(blogId) {
    browserHistory.push(`/blogs/${blogId}/posts/new`);
  }

  constructor(props) {
    super(props);

    const existingBlog = axios.get('http://localhost:3000/blogs/props.params.blogId')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    this.state = {
      // blog: getBlogById(parseInt(props.params.blogId))
      blog: existingBlog
    };
  }

  render() {
    console.log(this.state.blog);
    const blog = this.state.blog;
    const addNewPost = BlogPage.addNewPost.bind(this, blog.id);
    const posts = blog.posts.map((post) => {
      const onPostClick = BlogPage.onPostClick.bind(this, blog.id, post.id);

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
  params: React.PropTypes.object.isRequired,
};

export default BlogPage;
