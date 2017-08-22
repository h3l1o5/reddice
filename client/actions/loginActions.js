import axios from 'axios'

const login = (data) => (dispatch) => {
  return axios.post('/api/v1/auth', data)
}

export {
  login,
}