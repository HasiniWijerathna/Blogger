import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
      open: true,
    };
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
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const login = this.login.bind(this);
    const authenticated = getSession().authenticated;
    const signOut = this.signOut.bind(this);
    let addAction = null;
    if(authenticated) {
      addAction = <div>
        <AppBar
          title="Blogger"
          iconElementRight={<IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
             <MenuItem primaryText="Sign out" onClick = {signOut}/>
             <MenuItem primaryText="Help" />
             <MenuItem primaryText="Settings" />
          </IconMenu>}
          />
      </div>
    } else {
      addAction = <div> <AppBar
          title="Title"
          iconElementRight={<FlatButton label="Login" primary={true} onClick={login} />
      }
        />
    </div>
  //     addAction = <div>
  //     <IconMenu
  //    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  //    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  //  >
  //    <MenuItem primaryText="Refresh" />
  //    <MenuItem primaryText="Help" />
  //    <MenuItem primaryText="Sign out" />
  //  </IconMenu>
  //     </div>
    }
    return (

        <div>
          <div>
          </div>
          {addAction}
         </div>
    );
  }
}

export default HeaderBar;
