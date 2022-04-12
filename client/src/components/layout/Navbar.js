import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
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
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue-grey lighten-5">
            <Link
              to="/"
              style={{
                fontFamily: 'monospace',
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Automily
            </Link>

            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down nav-elements"
            >
              {authButtons}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
