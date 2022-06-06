import baseService from './base-service'

export default axios => resource => ({
    ...baseService(axios, resource),
    joinToEvent(payload) {
        return axios.post(`${resource}/join-to-event`, payload)
    },
    acceptedUserJoinToEvent(payload) {
        return axios.put(`${resource}/accepted-user-join-to-event`, payload)
    },
    rejectedUserJoinToEvent(payload) {
        return axios.put(`${resource}/rejected-user-join-to-event`, payload)
    }
})
