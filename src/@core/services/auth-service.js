import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  login(payload) {
    return axios.post(`${resource}/login`, payload)
  },
  registerNewParticipant(payload) {
    return axios.post(`${resource}/register-new-participant`, payload)
  }
})
