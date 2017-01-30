import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login-component';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

import {setSession} from '../services/SessionService';
import {post} from '../services/Requests';
import {loginURL} from '../services/urlFactory';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
        console.log(response);
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
    // axios.post('http://localhost:3000/auth/login', {
    //   username: this.state.user.name,
    //   password: this.state.user.password,
    // })
    // .then((response) => {
    //   const session = {
    //     authenticated: true,
    //     token: response.data.token,
    //   };
    //
    //   setSession(session);
    //
    //   browserHistory.push(this.state.nextPathname);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });


    // const allUsers = getAllUsers();
    // const users = allUsers.map(user => {
    //   if (user.name === this.state.user.name && user.password === this.state.user.password) {
    //     console.log("logged in");
    //   } else {
    //     console.log("logging failed");
    //   }
    // });
  }
  /**
   * [signUp description]
   */
  signUp() {
    browserHistory.push('/registration');
  }
  /**
   * [handleRequestClos description]
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

    return (
      <div>
        <Snackbar
         open={this.state.errorMessage.open}
         message={this.state.errorMessage.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
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
              <h2><FlatButton label="Create your account" onClick={signUp}/></h2>
            <TextField floatingLabelText="Username" value={this.state.user.name} onChange={onChangeName} />
            <TextField
              floatingLabelText="Password"
              value={this.state.user.password}
              type="password" onChange={onChangePassword}
            />
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
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="footer-manu">
                    <ul>
                      <li><a href="home">Home</a></li>
                      <li><a href="blogs">Blogs</a></li>
                      <li><a href="aboutUs">About Us</a></li>
                    </ul>
                  </div>
                  <p>Copyright &copy; Crafted by <a href="home">Blogger</a>.</p>
                </div>
              </div>
            </div>
          </footer>
      </div>
    );
  }
}
Login.propTypes = {
  location: React.PropTypes.object.isRequired,
};

export default Login;
