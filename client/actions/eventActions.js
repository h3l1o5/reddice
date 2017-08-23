import axios from 'axios'

const createEvent = (event) => (dispatch) => {
  return axios.post('/api/v1/events', event)
}

export {
  createEvent,
}