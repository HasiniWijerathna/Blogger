import React, {Component} from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import {isAuthenticated, resetSession} from '../services/SessionService';

/**
 * Representing the login sign up functionalities
 */
class Home extends Component {

  static login() {
    browserHistory.push('/login');
  }

  static signUp() {
    browserHistory.push('/registration');
  }

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: isAuthenticated()
    };

    // this.logout = this.logout.bind(this);
  }

  logout() {
    resetSession();
    this.setState({
      isAuthenticated: false
    });
  }

  render() {
    const logout = this.logout.bind(this);
    const authButton = this.state.isAuthenticated ?
      <FlatButton label="LOGOUT" onClick={logout} /> :
      <FlatButton label="LOGIN" onClick={Home.login} />;

    return (
      <div>
        <div>
          <Card>
            <CardHeader title="Personal | Business | Politics | Non-profits | Sports" />
            <CardMedia
              overlay={
                <CardTitle
                  title="Choose a plan that works for you.
                  Customize as much or as little as you want. Get help when you need it. Tell your story."
                />
            }
            >
              <img
                alt="Logo"
                src="http://static.wixstatic.com/media/2dffea_5fd0f21658c0452aa83414245c77249c.jpg_srz_1226_690_85_22_0.50_1.20_0.00_jpg_srz" // eslint-disable-line
              />
            </CardMedia>
            { authButton }
            <FlatButton
              label="Sign up"
              onClick={Home.signUp}
            />
          </Card>
        </div>
      </div>
    );
  }

}
export default Home;
