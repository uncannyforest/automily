import axios from 'axios'
import isEmpty from 'is-empty'
import jwt_decode from 'jwt-decode'

import { getErrors } from './errors'
import setAuthToken from '../utils/setAuthToken'

const USER_LOADING = 'USER_LOADING'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
}

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login') // re-direct to login on successful register
  } catch (err) {
    dispatch(getErrors(err.response.data))
  }
}

export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', userData)

    // Save to localStorage
    localStorage.setItem('jwtToken', data.token)
    // Set token to Auth header
    setAuthToken(data.token)
    // Set current user
    dispatch(setCurrentUser(data.user))
  } catch (err) {
    dispatch(getErrors(err.response.data))
  }
}

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
