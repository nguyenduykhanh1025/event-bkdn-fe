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
  }
})
