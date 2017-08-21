import axios from 'axios'

const userSignupRequest = (userData) => (dispatch) => {
  return axios.post('/api/v1/users/signup', userData)
}

export { 
  userSignupRequest,
}