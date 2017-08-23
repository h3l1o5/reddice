import axios from 'axios'
import jwtDecode from 'jwt-decode'

import setAuthorizationToken from '../utils/setAuthorizationToken'
import { SET_CURRENT_USER } from '../actions/types'

const login = (data) => (dispatch) => {
  return axios.post('/api/v1/auth', data).then(res => {
    const token = res.data.token
    localStorage.setItem('jwt', token)
    setAuthorizationToken(token)
    dispatch(setCurrentUser(jwtDecode(token)))
  })
}

const logout = () => (dispatch) => {
  localStorage.removeItem('jwt')
  setAuthorizationToken(false)
  dispatch(setCurrentUser({}))
}

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export {
  login,
  logout,
  setCurrentUser
}