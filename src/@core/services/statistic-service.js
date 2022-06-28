import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
  getStatisticGeneral() {
    return axios.get(`${resource}/get-statistic-general`)
  }
})
