import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../store/auth'
import classnames from 'classnames'

import InputField from '../elements/InputField'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    this.props.registerUser(newUser, this.props.history)
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
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to='/login'>Log in</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <InputField
            label='Name'
            name='name'
            value={this.state.name}
            onChange={this.onChange}
            errors={[errors.name]}
          />
          <InputField
            label='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.onChange}
            errors={[errors.email]}
          />
          <InputField
            label='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.onChange}
            errors={[errors.password, errors.passwordincorrect]}
          />
          <InputField
            label='Confirm Password'
            name='password2'
            type='password'
            value={this.state.password2}
            onChange={this.onChange}
            errors={[errors.password2]}
          />
          <div>
            <button type='submit'>Sign up</button>
          </div>
        </form>
      </main>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
