import axios from 'axios'
import localStorageHelper from './local-storage'

const tokenFromLocalStorage = localStorageHelper.getToken()

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${tokenFromLocalStorage}`
  }
})

export { axiosClient }
