import React, { Component } from 'react';
import map from 'lodash/map'
import axios from 'axios'
import classnames from 'classnames'

import timezones from '../../data/timezones'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: [],
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    this.setState({ errors: [], isLoading: true })
    e.preventDefault()
    this.props.userSignupRequest(this.state)
      .then((res) => { 
        this.setState({ errors: res.data, isLoading: false }) 
      })
  }

  render() {
    const options = map(timezones, (val, key) => (
      <option key={key} value={val}>{key}</option>
    ))
    const { errors } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join our community!</h1>

        <div className={classnames("form-group", { 'has-error': errors.username })}>
          <label className="control-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            value={this.state.username} 
            onChange={this.handleChange}
          />
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.email })}>
          <label className="control-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange}
          />
          {errors.email && <span className="help-block">{errors.email}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.password })}>
          <label className="control-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange}
          />
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.passwordConfirmation })}>
          <label className="control-label">Password Confirmation</label>
          <input 
            type="password" 
            className="form-control" 
            name="passwordConfirmation" 
            value={this.state.passwordConfirmation} 
            onChange={this.handleChange}
          />
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.timezone })}>
          <label className="control-label">Timezone</label>
          <select  
            className="form-control" 
            name="timezone" 
            value={this.state.timezone} 
            onChange={this.handleChange}
          >
            <option value="" disabled>Choose Your Timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;