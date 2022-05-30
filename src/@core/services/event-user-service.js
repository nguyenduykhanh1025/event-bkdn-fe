import baseService from './base-service'

export default axios => resource => ({
    ...baseService(axios, resource),
    joinToEvent(payload) {
        return axios.post(`${resource}/join-to-event`, payload)
    }
})
