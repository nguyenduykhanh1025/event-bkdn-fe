import AuthService from './auth-service'
import { axiosClient } from '../utils/axios-helper'

const authService = AuthService(axiosClient)('/auth')
const eventService = AuthService(axiosClient)('/events')

const adminEventService = AuthService(axiosClient)('/admin/events')

export { authService, eventService, adminEventService }
