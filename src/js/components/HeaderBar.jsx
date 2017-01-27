import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';

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
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const login = this.login.bind(this);
    const authenticated = getSession().authenticated;
    const signOut = this.signOut.bind(this);
    const navaigateHome = this.navaigateHome.bind(this);
    const navaigateBlogs = this.navaigateBlogs.bind(this);

    // const name = getSession().user.name;
    // let username = '';
    // if(name) {
    //   // username = `Welcome ${name}`;
    // } else {
    //   username = 'Welcome';
    // }
    // console.log(getSession().user.name);

    let message = 'Welcome!';
    let toolbarGroup = (
      <ToolbarGroup>
        <FlatButton label="Login" primary={true} onClick={login}/>
      </ToolbarGroup>
    );

    if(authenticated) {
      const user = getSession().user.name;
      if(user) {
        message = `Welcome ${user}`;
      }

      toolbarGroup = (
        <ToolbarGroup>
          <ToolbarTitle text={message} />
          <FlatButton label="Logout" primary={true} onClick={signOut}/>
        </ToolbarGroup>
      );
    }


    return (
      <div>
        <Toolbar className={'app-toolbar'}>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Home" onClick={navaigateHome}/>
              <MenuItem value={2} primaryText="Blogs" onClick={navaigateBlogs}/>
            </DropDownMenu>
          </ToolbarGroup>
          {toolbarGroup}
        </Toolbar>
      </div>
    );
  }
}

export default HeaderBar;
