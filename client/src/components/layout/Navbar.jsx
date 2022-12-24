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
      authButtons = <button onClick={this.onLogoutClick}>Logout</button>
    else
      authButtons = (
        <>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </>
      )

    return (
      <nav>
        <Link
          to="/"
          style={{
            fontFamily: 'monospace',
          }}
        >
          <i className="material-icons">code</i>
          Automily
        </Link>

        <ul>{authButtons}</ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
