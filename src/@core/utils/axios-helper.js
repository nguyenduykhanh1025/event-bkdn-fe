import axios from 'axios'
import constants from './constants'
import localStorageHelper from './local-storage'
import Router from 'next/router'

const axiosClient = axios.create({
  baseURL: 'http://doanthanhnienbachkhoa.site:3000/api',
  headers: {
    'content-type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${localStorageHelper.getToken()}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === constants.HTTP_STATUS.HTTP_FORBIDDEN) {
      Router.replace('/pages/login')
    }
    return Promise.reject(error)
  }
)

export { axiosClient }
