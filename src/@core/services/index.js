import AuthService from './auth-service'
import EventService from './event-service'
import JournalService from './journal-service'

import { axiosClient } from '../utils/axios-helper'

const authService = AuthService(axiosClient)('/auth')
const eventService = AuthService(axiosClient)('/events')

const adminEventService = EventService(axiosClient)('/admin/events')
const adminJournalService = JournalService(axiosClient)('/admin/journals')

export { authService, eventService, adminEventService, adminJournalService }
