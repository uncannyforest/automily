import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/auth'

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { user } = this.props.auth

    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{' '}
                <span style={{ fontFamily: 'monospace' }}>MERN</span> app 👏
              </p>
            </h4>
            <div className="col s6">
              <button
                onClick={this.onLogoutClick}
                className="main-button btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
            <div className="col s6">
              <a
                href="/posts"
                className="main-button btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                See Posts
              </a>
            </div>
            <div className="col s6">
              <a
                href="/create"
                className="main-button btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Create Post
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
