import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  paginateEventIncoming(params) {
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
    return axios.get(`${resource}/paginate-event-incoming`, payload)
  },
  paginateEventHappening(params) {
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
    return axios.get(`${resource}/paginate-event-happening`, payload)
  },
  paginateEventOver(params) {
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
    return axios.get(`${resource}/paginate-event-over`, payload)
  },
  getEventsJoinByIdUser(idUser) {
    return axios.get(`${resource}/get-events-join-by-id-user?id_user=${idUser}`)
  },
  update(payload) {
    return axios.put(`${resource}`, payload)
  }
})
