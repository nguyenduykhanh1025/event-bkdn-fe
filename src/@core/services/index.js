import AuthService from './auth-service'
import EventService from './event-service'
import JournalService from './journal-service'
import UserService from './user-service'
import EventUserService from './event-user-service'
import StatisticService from './statistic-service'
import ManagerEventService from './manager-event-service'

import { axiosClient } from '../utils/axios-helper'

const authService = AuthService(axiosClient)('/auth')
const eventService = AuthService(axiosClient)('/events')
const eventUserService = EventUserService(axiosClient)('/event-users')

const adminEventService = EventService(axiosClient)('/admin/events')
const adminJournalService = JournalService(axiosClient)('/admin/journals')
const adminUserService = UserService(axiosClient)('/admin/users')
const adminEventUserService = EventUserService(axiosClient)('/admin/event-users')
const adminStatisticUserService = StatisticService(axiosClient)('/admin/statistics')
const adminManagerEventService = ManagerEventService(axiosClient)('/admin/manager-events')

export {
  authService,
  eventService,
  adminEventService,
  adminJournalService,
  adminUserService,
  eventUserService,
  adminEventUserService,
  adminStatisticUserService,
  adminManagerEventService
}
