import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../styles/master.scss';

import { isAuthenticated } from './services/SessionService';

import App from './containers/App';
import BlogsHomePage from './containers/BlogsHomePage';
import BlogPage from './containers/BlogPage';
import PostPage from './containers/PostPage';
import AddNewPost from './containers/AddNewPost';
import AddNewBlog from './containers/AddNewBlog';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const checkAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (authenticated) {
    replace({
      pathname: '/home'
    });
  }
};

render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="login" component={Login} onEnter={checkAuth} />
      <Route path="registration" component={Registration} />
      <Route path="blog" component={BlogsHomePage} onEnter={requireAuth} />
      <Route path="blogs/new" component={AddNewBlog} onEnter={requireAuth} />
      <Route path="blogs/:blogId" component={BlogPage} onEnter={requireAuth} />
      <Route path="blogs/:blogId/posts/new" component={AddNewPost} onEnter={requireAuth} />
      <Route path="blogs/:blogId/posts/:postId" component={PostPage} onEnter={requireAuth} />
    </Route>
  </Router>), document.getElementById('root')
);
