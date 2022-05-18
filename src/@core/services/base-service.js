const baseService = ($axios, resource) => {
  return {
    index() {
      return $axios.get(`${resource}`)
    },

    show(id) {
      return $axios.get(`${resource}/${id}`)
    },

    paginate(params) {
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
      return $axios.get(`${resource}/paginate`, payload)
    },

    create(payload) {
      return $axios.post(`${resource}`, payload)
    },

    update(id, payload) {
      return $axios.put(`${resource}/${id}`, payload)
    },

    delete(id) {
      return $axios.delete(`${resource}/${id}`)
    }
  }
}

export default baseService
