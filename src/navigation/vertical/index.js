// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import BookClockOutline from 'mdi-material-ui/BookClockOutline'
import Newspaper from 'mdi-material-ui/Newspaper'
import AccountGroup from 'mdi-material-ui/AccountGroup'

const navigation = () => {
  return [
    {
      title: 'Trang Chủ',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Quản Lý'
    },
    {
      title: 'Sự Kiện',
      icon: BookClockOutline,
      path: '/event-management'
    },
    {
      title: 'Tin Tức',
      icon: Newspaper,
      path: '/news-management'
    },
    {
      title: 'Người Tham Gia',
      icon: AccountGroup,
      path: '/participant-management'
    },
    {
      sectionTitle: 'Pages'
    },

    {
      title: 'Cài Đặt Tài Khoản',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // }
  ]
}

export default navigation
