import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login-component';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {browserHistory} from 'react-router';

import {setSession} from '../services/SessionService';

/**
 * Representing the logic of user login function
 */
class Login extends Component {
  //
  // static responseGoogle(googleUser) {
  //   const idToken = googleUser.getAuthResponse().idToken;
  // }

  constructor(props) {
    super(props);

    let pathname = '/home';
    if (props.location.state && props.location.state.nextPathname) {
      pathname = props.location.state.nextPathname;
    }

    this.state = {
      nextPathname: pathname,
      user: {
        name: '',
        password: '',
      },
    };
  }

  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const user = this.state.user;

    user.name = newName;

    this.setState({
      user,
    });
  }

  onChangePassword(changeEvent) {
    const newPassword = changeEvent.target.value;
    const user = this.state.user;

    user.password = newPassword;

    this.setState({
      user,
    });
  }

  onConfirm() {
    axios.post('http://localhost:3000/auth/login', {
      username: this.state.user.name,
      password: this.state.user.password,
    })
    .then((response) => {
      const session = {
        authenticated: true,
        token: response.data.token,
      };

      setSession(session);

      browserHistory.push(this.state.nextPathname);
    })
    .catch((error) => {
      console.log(error);
    });


    // const allUsers = getAllUsers();
    // const users = allUsers.map(user => {
    //   if (user.name === this.state.user.name && user.password === this.state.user.password) {
    //     console.log("logged in");
    //   } else {
    //     console.log("logging failed");
    //   }
    // });
  }


  render() {
    const onConfirm = this.onConfirm.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      },
      titleStyle: {
        color: 'rgb(0,0,0)',
      },
    };

    const tilesData = [
      {
        img: 'https://s0.wp.com/wp-content/themes/h4/i/features-2016/features-icon-blog-website.svg',
        title: 'Blog, website, or both',
        author: 'Build a blog, a full website, or a combo.',
      },
      {
        img: 'https://s0.wp.com/wp-content/themes/h4/i/features-2016/features-icon-plans.svg',
        title: 'Plans for any budget',
        author: 'Start free. Upgrade for advanced customizing or business tools. Or stay free!',
      },
      {
        img: 'https://s0.wp.com/wp-content/themes/h4/i/features-2016/features-icon-domains.svg',
        title: 'Add Custom domains',
        author: 'Danson67',
      },
    ];
    return (


      <div>
        <h1>Login</h1>
        <div><center>
          <GoogleLogin
            socialId="941519095950-s9379hsbftcc116mj1ubavvtojblft8d.apps.googleusercontent.com"
            class="google-login"
            scope="profile"
            responseHandler={this.responseGoogle}
            buttonText="Login With Google"
          />
        </center>
        </div>
        <GridList cols={3.3}>
          {tilesData.map((tile) =>
            <GridTile
              key={tile.img}
              title={tile.title}
              actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 80%,rgba(0,0,0,0) 100%)"
            >
              <img alt="logo" src={tile.img} />
            </GridTile>
          )}
        </GridList>
        <div>
          <TextField floatingLabelText="Username" value={this.state.user.name} onChange={onChangeName} />
          <TextField
            floatingLabelText="Password"
            value={this.state.user.password}
            type="password" onChange={onChangePassword}
          />
          <RaisedButton label="login" primary onClick={onConfirm} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.object.isRequired,
};

export default Login;
