import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import {Link} from 'react-router';
/**
 * Representing the header bar
 */
class HeaderBar extends Component {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
/**
 * [login description]
 */
  login() {
    browserHistory.push('/login');
  }
/**
 * [signOut description]
 */
  signOut() {
    console.log('sign out');
    resetSession();
    isAuthenticated() === false;
    console.log(isAuthenticated());
    browserHistory.push('/home');
  }
// logged(props) {
//   <IconMenu
//     {...props}
//     iconButtonElement={
//       <IconButton><MoreVertIcon /></IconButton>
//     }
//     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//   >
//     <MenuItem primaryText="Refresh" />
//     <MenuItem primaryText="Help" />
//     <MenuItem primaryText="Sign out" />
//   </IconMenu>
// }

//   const Logged = (props) => (
//  <IconMenu
//    {...props}
//    iconButtonElement={
//      <IconButton><MoreVertIcon /></IconButton>
//    }
//    targetOrigin={{horizontal: 'right', vertical: 'top'}}
//    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//  >
//    <MenuItem primaryText="Refresh" />
//    <MenuItem primaryText="Help" />
//    <MenuItem primaryText="Sign out" />
//  </IconMenu>
// );
/**
 * [handleChange description]
 * @param  {[type]} event [description]
 * @param  {[type]} index [description]
 * @param  {[type]} value [description]
 */
  handleChange(event, index, value) {
    this.setState({
      value,
    });
  }

  /**
   * [navaigateHome description]
   */
  navaigateHome() {
    browserHistory.push('/home');
  }
/**
 * [navaigateBlogs description
 */
  navaigateBlogs() {
    browserHistory.push('/blogs');
  }
/**
 * [navaigateAboutUs description]
 */
  navaigateAboutUs() {
    browserHistory.push('/aboutUs');
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const login = this.login.bind(this);
    const authenticated = getSession().authenticated;
    const signOut = this.signOut.bind(this);
    const navaigateHome = this.navaigateHome.bind(this);
    const navaigateBlogs = this.navaigateBlogs.bind(this);
    const navaigateAboutUs = this.navaigateAboutUs.bind(this);
    let container = <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="index.html">
                  <img src="img/logo.png" alt="Logo"/>
                </a>
              </div>
              <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/blogs">Blogs</Link></li>
                  <li><Link to="/aboutUs">About Us</Link></li>
                  <li><Link to="/login">Login</Link></li>
              </ul>
              </div>
              </div>
            </nav>
          </div>
        </div>
      </div>;
    if (authenticated) {
      let message = 'Welcome!';
      let toolbarGroup = (
        <ToolbarGroup>
          <FlatButton label="Login" primary={true} onClick={login}/>
        </ToolbarGroup>
      );
      const user = getSession().user.name;
      if(user) {
        message = `Welcome ${user}`;
      }
      console.log('authenticated');
      container = <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="index.html">
                        <img src="img/logo.png" alt="Logo"/>
                    </a>
                  </div>
                  <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/home">Home</Link></li>
                      <li><Link to="/blogs">Blogs</Link></li>
                      <li><Link to="/aboutUs">About Us</Link></li>
                      <a className="btn btn-default btn-call-to-action" onClick={signOut} >Sign out</a>
                  </ul>
                  </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>;
      toolbarGroup = (
        <ToolbarGroup>
          <ToolbarTitle text={message} />
          <FlatButton label="Logout" primary={true} onClick={signOut}/>
        </ToolbarGroup>
      );
    }


    return (
      <div>
        <header>
        {container}
          </header>
      </div>
    );
  }
}

export default HeaderBar;
