import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import {Link} from 'react-router';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
/**
 * Representing the header bar
 */
class HeaderBar extends Component {
/**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
/**
 * [description]
 * @param  {[type]} event [description]
 * @param  {[type]} index [description]
 * @param  {[type]} value [description]
 */
  handleChange(event, index, value) {
    this.setState({value});
  }

/**
 *Navigates to the login page
 */
  login() {
    browserHistory.push('/login');
  }
/**
 * Sets the authenticated false and navigates to the home page
 */
  signOut() {
    resetSession();
    isAuthenticated() === false;
    browserHistory.push('/home');
  }
  /**
   * Navigates to the home page
   */
  navaigateHome() {
    browserHistory.push('/home');
  }
/**
 * Navigate to the blogs page
 */
  navaigateBlogs() {
    browserHistory.push('/blogs');
  }
/**
 * Navigate to the about us page
 */
  navaigateAboutUs() {
    browserHistory.push('/aboutUs');
  }
/**
 * Navigate to the about us page
 */
  navigateEditProfile() {
    browserHistory.push('/editProfile');
  }
  /**
   * Navigate to the settings page
   */
  navigateSettings() {
    browserHistory.push('/settings');
  }
  /**
  * Describes the elements on the registration page
  * @return {String} HTML elements
  */
  render() {
    const authenticated = getSession().authenticated;
    const navigateEditProfile = this.navigateEditProfile.bind(this);
    const navigateSettings = this.navigateSettings.bind(this);
    const signOut = this.signOut.bind(this);
    let container = <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">
                  <img src="http://localhost:8000/img/logo.png" alt="Logo"/>
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
      container = <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand">
                    <img src={this.props.logo} alt="Logo"/>
                  </a>
                </div>
                <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/aboutUs">About Us</Link></li>
                    <li><a onClick={signOut} >Sign out</a></li>
                    <li><IconMenu
                         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                         targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Edit Profile" onClick={navigateEditProfile} />
                      <MenuItem primaryText="Settings" onClick={navigateSettings}/>
                    </IconMenu>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>;
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
HeaderBar.propTypes = {
  logo: React.PropTypes.string.isRequired,
};

export default HeaderBar;
