import axios from 'axios'
import jwt from 'jsonwebtoken'

import setAuthorizationToken from '../utils/setAuthorizationToken'
import { SET_CURRENT_USER } from '../actions/types'

const login = (data) => (dispatch) => {
  return axios.post('/api/v1/auth', data).then(res => {
    const token = res.data.token
    localStorage.setItem('jwt', token)
    setAuthorizationToken(token)
    dispatch(setCurrentUser(jwt.decode(token)))
  })
}

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export {
  login,
  setCurrentUser
}