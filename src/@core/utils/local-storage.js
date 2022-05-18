import constants from 'src/@core/utils/constants'

const localStorageHelper = {
  setToken(token) {
    localStorage.setItem(constants.LOCAL_STORAGE.TOKEN_KEY, token)
  },
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(constants.LOCAL_STORAGE.TOKEN_KEY)
    }
  }
}

export default localStorageHelper
