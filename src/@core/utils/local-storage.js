import constants from 'src/@core/utils/constants'

const localStorageHelper = {
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(constants.LOCAL_STORAGE.TOKEN_KEY, token)
    }
  },
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(constants.LOCAL_STORAGE.TOKEN_KEY)
    }
  },
  removeToken() {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem(constants.LOCAL_STORAGE.TOKEN_KEY)
    }
  }
}

export default localStorageHelper
