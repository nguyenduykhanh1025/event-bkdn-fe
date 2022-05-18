import constants from 'src/@core/utils/constants'

const localStorageHelper = {
  setToken(token) {
    localStorage.setItem(constants.LOCAL_STORAGE.TOKEN_KEY, token)
  },
  getToken() {
    localStorage.removeItem(constants.LOCAL_STORAGE.TOKEN_KEY)
  }
}

export default localStorageHelper
