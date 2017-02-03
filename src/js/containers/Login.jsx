import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';

import {setSession} from '../services/SessionService';
import {post} from '../services/Requests';
import {loginURL} from '../services/urlFactory';


const snackBarStyleMap = {
  success: {
    bodyStyle: {
      'background-color': '#66BB6A',
    },
    contentStyle: {
      color: 'black',
    },
  },
  error: {
    bodyStyle: {
      'background-color': '#C62828',
    },
    contentStyle: {
      color: 'black',
    },
  },
  warning: {
    bodyStyle: {
      'background-color': '#FFF176',
    },
    contentStyle: {
      color: 'black',
    },
  },
};

/**
* Representing the logic of user login function
*/
class Login extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
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
      errorMessage: {
        open: false,
        message: '',
      },
    };
  }

/**
* Event changer for the username
* @param  {String} changeEvent Changer event of the username
*/
  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const user = this.state.user;

    user.name = newName;

    this.setState({
      user,
    });
  }

/**
* Event changer for the password
* @param  {String} changeEvent Changer event of the password
*/
  onChangePassword(changeEvent) {
    const newPassword = changeEvent.target.value;
    const user = this.state.user;

    user.password = newPassword;

    this.setState({
      user,
    });
  }
/**
* Sends a POST Request to register the user
*/
  onConfirm() {
    const data = {
      username: this.state.user.name,
      password: this.state.user.password,
    };
    post(loginURL(), data)
      .then((response) => {
        const session = {
          authenticated: true,
          token: response.data.token,
          user: response.data.user,
        };
        setSession(session);
        browserHistory.push(this.state.nextPathname);
      })
      .catch((error) => {
        this.setState({
          errorMessage: {
            open: true,
            message: 'Incorrect email or password',
          },
        });
      });
  }
/**
 * Navigates to the registration page
 */
  signUp() {
    browserHistory.push('/registration');
  }
/**
 * Hides the Snackbar
 */
  handleRequestClose() {
    this.setState({
      errorMessage: {
        open: false,
        message: '',
      },
    });
  }
/**
* Describes the elements on the Post page
* @return {String} HTML elements
*/
  render() {
    const onConfirm = this.onConfirm.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const signUp = this.signUp.bind(this);

    const snackBarStyle = {
      marginBottom: '20px',
      left: '20%',
    };

    return (
    <div>
      <Snackbar
       open={this.state.errorMessage.open}
       message={this.state.errorMessage.message}
       autoHideDuration={4000}
       onRequestClose={handleRequestClose}
       style={snackBarStyle}
       bodyStyle={snackBarStyleMap.error.bodyStyle}
       contentStyle={snackBarStyleMap.error.contentStyle}
     />
    <Card>
      <section id="global-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>It’s time to get more from what you read.</h1>
                  <p>Find and share real perspectives about topics that matter today</p>
                </div>
              </div>
            </div>
          </div>
        </section>
          <form>
            <formgroup>
              <hgroup>
                <img src="img/login.png" alt="loginlogo"/>
                  <h2>
                    <FlatButton label="Create your account" onClick={signUp}/>
                  </h2>
                    <TextField
                      floatingLabelText="Username"
                      value={this.state.user.name}
                      onChange={onChangeName} />
                    <TextField
                      floatingLabelText="Password"
                      value={this.state.user.password}
                      type="password"
                      onChange={onChangePassword} />
                    <FlatButton label="Login" onClick={onConfirm} />
                  </hgroup>
                </formgroup>
              </form>
            <CardText></CardText>
        </Card>
        <Card>
          <section id="call-to-action">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block">
                    <h2>We design delightful digital experiences.</h2>
                      <p>Read more about what we do and our philosophy of design.</p>
                      <p>Judge for yourself The work and results we’ve achieved for other clients,</p>
                      <p> and meet our highly experienced Team who just love to design.</p>
                        <RaisedButton label="Create your blog" style />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Card>
        </div>
    );
  }
}
Login.propTypes = {
  location: React.PropTypes.object.isRequired,
};

export default Login;
