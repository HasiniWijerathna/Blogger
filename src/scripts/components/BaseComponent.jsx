import React, {Component} from 'react';

/**
* Represents the  logic of adding new comments functionality
*/
class BaseComponent extends Component {


/**
 * [login description]
 */
  login() {
    console.log('login');
  }
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    const login = this.login.bind(this);
    login();
    return(
      <div>

      </div>
    );
  }
}

export default BaseComponent;
