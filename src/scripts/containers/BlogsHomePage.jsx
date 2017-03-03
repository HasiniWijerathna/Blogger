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
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
      blogsOfCategory: [],
      category: [],
      open: false,
      message: '',
      loading: false,
    },
    this.getCategory = this.getCategory.bind(this);
  }

  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.getCategory();
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
 * Fetches the category by it's ID
 * @param  {Event} categoryId   Category ID
 * @return {Integer}            Sends a GET request
 */
  getOneCategory(categoryId) {
    const url = modelURL('blogCategory', categoryId);
    return get(url)
      .then((response) => {
        this.setState({
          blogsOfCategory: response.data.Blogs,
        });
        browserHistory.push(`/blogs/category/${categoryId}`);
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
  * Gets all the blog categories
  * @return {Event}   Sends a GET request
  */
  getCategory() {
    const url = modelURL('blogCategory');
    return get(url)
      .then((response) => {
        this.setState({
          value: '1',
          category: response.data.results,
        });
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
  * Navigates to AllBlogs page
  */
  navigateAllBlogs() {
    browserHistory.push('/allBlogs');
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
* Navigates to the Add blogs page
*/
  addNewBlog() {
    browserHistory.push('blogs/new');
  }
/**
* Render all blogs and autoComplete field
* @return {String} Blog list
*/
  render() {
    const navigateAllBlogs = this.navigateAllBlogs.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const addNewBlog = this.addNewBlog.bind(this);
    const gridStyles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        marginTop: '35px',
        width: 900,
        height: 1500,
        overflowY: 'auto',
      },
    };
    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      marginBottom: '10px',
      zIndex: 99999,
    };
    const categories = this.state.category;
    const grids = categories.map((category) => {
      const getOneCategory = this.getOneCategory.bind(this, category.id);
      return (
        <GridTile
          key={category.id}
          title={category.name}
          actionIcon={<IconButton onClick={getOneCategory} ><StarBorder color="white" /></IconButton>}
        >
          <img src={category.imageURL} />
        </GridTile>
      );
    });

    return (
      <div className =".app.blogList">
        <div>
          <Snackbar
           open={this.state.open}
           message={this.state.message}
           autoHideDuration={4000}
           onRequestClose={handleRequestClose} />
          <div>
            <center>
              <div className= "blogCategory">
                <h4>Select a Category</h4>
              </div>
              <RaisedButton label="All Blogs" onClick={navigateAllBlogs} />
              <GridList
                cellHeight={250}
                style={gridStyles.gridList}>
                {grids}
              </GridList>
            </center>
            <FloatingActionButton onClick={addNewBlog} style={buttonStyle}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogsHomePage;
