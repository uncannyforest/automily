import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../store/auth'
import classnames from 'classnames'

import InputField from '../elements/InputField'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard') // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  }

  render() {
    const { errors } = this.state

    return (
      <main>
        <Link to='/'>
          <i className='material-symbols-outlined'>keyboard_backspace</i> Back
          to home
        </Link>
        <div>
          <h4>
            <b>Login</b> below
          </h4>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <InputField
            label='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.onChange}
            errors={[errors.email, errors.emailnotfound]}
          />
          <InputField
            label='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.onChange}
            errors={[errors.password, errors.passwordincorrect]}
          />
          <div>
            <button type='submit'>Log in</button>
          </div>
        </form>
      </main>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)
