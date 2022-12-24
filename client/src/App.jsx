import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/private-route/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import CreatePost from './components/dashboard/CreatePost'
import DisplayAllPosts from './components/dashboard/DisplayAllPosts'
import DisplayPost from './components/dashboard/DisplayPost'

import setAuthToken from './utils/setAuthToken'
import store from './store'
import { setCurrentUser, logoutUser } from './store/auth'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwtDecode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = './login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar auth={this.props.auth} />
          <div className="app">
            <Route exact path="/" component={DisplayAllPosts} />
            <Route exact path="/posts" component={DisplayAllPosts} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={DisplayPost} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create" component={CreatePost} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
