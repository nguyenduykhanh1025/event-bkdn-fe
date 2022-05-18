const baseService = ($axios, resource) => {
    return {
      index() {
        return $axios.$get(`${resource}`)
      },
  
      show(id) {
        return $axios.$get(`${resource}/${id}`)
      },
  
      create(payload) {
        return $axios.$post(`${resource}`, payload)
      },
  
      update(id, payload) {
        return $axios.$put(`${resource}/${id}`, payload)
      },
  
      delete(id) {
        return $axios.$delete(`${resource}/${id}`)
      }
    }
  }
  
  export default baseService
  