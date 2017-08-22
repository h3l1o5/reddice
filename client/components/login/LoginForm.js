import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup'
import validateInput from '../../../server/shared/validations/login'
import { login } from '../../actions/loginActions'
import { addFlashMessage } from '../../actions/flashMessages'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.isValid()) {
      console.log('hi')
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state)
        .then((res) => {
          this.setState({ isLoading: false }) 
          this.props.addFlashMessage({
            type: 'success',
            text: 'You log in seccessfully. Welcome!'
          })
          this.context.router.history.push('/')
        })
        .catch((err) => {
          this.setState({ errors: err.response.data.errors, isLoading: false })           
        })
    }
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.handleChange}
        />

        <TextFieldGroup
          field="password"
          label="password"
          value={password}
          error={errors.password}
          onChange={this.handleChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading} type="submit">Login</button>
        </div>
      </form>      
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginForm)