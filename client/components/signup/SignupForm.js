import React, { Component } from 'react';
import map from 'lodash/map'

import timezones from '../../data/timezones'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const options = map(timezones, (val, key) => (
      <option key={key} value={val}>{key}</option>
    ))
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join our community!</h1>

        <div className="form-group">
          <label className="control-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            value={this.state.username} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input 
            type="password" 
            className="form-control" 
            name="Password Confirmation" 
            value={this.state.passwordConfirmation} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

export default SignupForm;