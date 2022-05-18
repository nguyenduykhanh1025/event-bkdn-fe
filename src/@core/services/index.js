import AuthService from './auth-service'
import { axiosClient } from '../utils/axios-helper'

const authService = AuthService(axiosClient)('/auth')

export { authService }
