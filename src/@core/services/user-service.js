import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  paginateParticipant(params) {
    const payload = {
      params: {
        limit: '',
        sort_column: '',
        sort_type: '',
        page: 1,
        search_data: '',
        filter_column: '',
        filter_data: '',
        ...params
      }
    }
    return axios.get(`${resource}/paginate-participant`, payload)
  },
  getUsersByIdEvent(idEvent) {
    return axios.get(`${resource}/get-users-by-id-event?idEvent=${idEvent}`)
  },
  getById(id) {
    return axios.get(`${resource}/get-user-by-id?id=${id}`)
  }
})
