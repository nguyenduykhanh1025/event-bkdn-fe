import baseService from './base-service'

export default axios => resource => ({
  ...baseService(axios, resource),
})
