import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Popup from 'react-popup';

class Registration extends Component {

  static validateName(name = '') {
    let error = null;

    if (!name || name.length === 0) {
      error = 'Name is required';
    } else if (name.length < 6) {
      error = 'Name should be atleast with 6 characters';
    }

    return error;
  }

  static validateEmail(email = '') {
    let error = null;

    if (!email || email.length === 0) {
      error = 'Email is required';
    } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = 'Invalid email address';
    }

    return error;
  }

  static validatePassword(password = '', confirmPassword = '') {
    let passwordError = null;
    let confirmPasswordError = null;

    if (!password || password.length === 0) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must contain atleast 6 characters';
    }

    if (password !== confirmPassword) {
      confirmPasswordError = 'Confirm password does not match';
    }

    return { passwordError, confirmPasswordError };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      formValid: false,
      error: {
        name: this.validateName(),
        email: this.validateEmail(),
        password: this.validatePassword().passwordError,
        confirmPassword: this.validatePassword().confirmPasswordError
      },
      focused: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    };

    this.validateAll = this.validateAll.bind(this);
  }

  onChangeName(changeEvent) {
    const newName = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const nameError = this.validateName(newName);

    user.name = newName;
    error.name = nameError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error
    });
  }

  onChangeEmail(changeEvent) {
    const newEmail = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const emailError = this.validateEmail(newEmail);

    user.email = newEmail;
    error.email = emailError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error
    });
  }

  onChangePassword(changeEvent) {
    const password = changeEvent.target.value;
    const user = this.state.user;
    const confirmPassword = `${user.confirmPassword}`;
    const error = this.state.error;
    const validationErrors = this.validatePassword(password, confirmPassword);

    user.password = password;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error
    });
  }

  OnConfirmPassword(changeEvent) {
    const confirmPassword = changeEvent.target.value;
    const user = this.state.user;
    const password = user.password;
    const error = this.state.error;
    const validationErrors = this.validatePassword(password, confirmPassword);

    user.confirmPassword = confirmPassword;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error
    });
  }

  onConfirm() {
    console.log(this.state.formValid);
    if (this.state.formValid === true) {
      browserHistory.push('/login');
    } else if (this.state.formValid === false) {
      browserHistory.push('/registration');
    }
  }

  setFocus(elementName) {
    const focused = this.state.focused;

    if (!focused[elementName]) {
      focused[elementName] = true;
      this.setState({
        focused
      });
    }
  }

  validateAll() {
    return this.state.error.name === null && this.state.error.email === null &&
      this.state.error.password === null && this.state.error.confirmPassword === null;
  }

  render() {
    const onChangeName = this.onChangeName.bind(this);
    const onChangeEmail = this.onChangeEmail.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const OnConfirmPassword = this.OnConfirmPassword.bind(this);
    const onConfirm = this.onConfirm.bind(this);

    const onNameFocusOut = this.setFocus.bind(this, 'name');
    const onEmailFocusOut = this.setFocus.bind(this, 'email');
    const onPasswordFocusOut = this.setFocus.bind(this, 'password');
    const OnConfirmPasswordFocusOut = this.setFocus.bind(this, 'confirmPassword')

    return (
      <div>
        <Popup />
        <div>
          <div><TextField floatingLabelText="Username" value={this.state.user.name}  errorText={this.state.focused.name && this.state.error.name} onChange={onChangeName} onBlur={onNameFocusOut}/></div>
          <div><TextField floatingLabelText="Email" value={this.state.user.email} errorText={this.state.focused.email && this.state.error.email} onChange={onChangeEmail}/></div>
          <div><TextField floatingLabelText="Password" value={this.state.user.password} errorText={this.state.focused.password && this.state.error.password} type='password' onChange={onChangePassword}/></div>
          <div><TextField floatingLabelText="Confirm Password" value={this.state.user.confirmPassword} errorText={this.state.focused.confirmPassword && this.state.error.confirmPassword} type='password' onChange={OnConfirmPassword}/></div>
          <div><RaisedButton label="Create Account" disabled={!this.state.formValid} onClick={onConfirm} /></div>
        </div>
      </div>
    );
  }
}
export default Registration;
