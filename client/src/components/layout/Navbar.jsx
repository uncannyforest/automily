import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/auth'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    let authButtons
    if (this.props.auth.isAuthenticated)
      authButtons = (
        <li>
          <a href='#' onClick={this.onLogoutClick} className='button'>
            Log Out
          </a>
        </li>
      )
    else
      authButtons = (
        <>
          <li>
            <Link to='/register' className='button'>
              Register
            </Link>
          </li>
          <li>
            <Link to='/login' className='button'>
              Log in
            </Link>
          </li>
        </>
      )

    return (
      <nav>
        <h1>
          <Link to='/'>
            <i className='material-symbols-outlined'>smart_toy&#20;</i>
            Automily
          </Link>
        </h1>
        <ul>{authButtons}</ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
