import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import CalendarArrowRight from 'mdi-material-ui/CalendarArrowRight'
import ClockOutline from 'mdi-material-ui/ClockOutline'
import CalendarArrowLeft from 'mdi-material-ui/CalendarArrowLeft'
import TabHappeningEvents from './components/TabHappeningEvents'
import TabIncomingEvents from './components/TabIncomingEvents'
import TabOverEvents from './components/TabOverEvents'

import 'react-datepicker/dist/react-datepicker.css'
import { Typography } from '@mui/material'
import TitleHeaderPage from 'src/@core/components/title-header-page'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <TitleHeaderPage title='Quản Lý Sự Kiện' />
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarArrowRight />
                  <TabName>Sắp Diễn Ra</TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ClockOutline />
                  <TabName>Đang Diễn Ra</TabName>
                </Box>
              }
            />
            <Tab
              value='info'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarArrowLeft />
                  <TabName>Đã Diễn Ra</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <TabIncomingEvents />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <TabHappeningEvents />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            <TabOverEvents />
          </TabPanel>
        </TabContext>
      </Card>
    </>
  )
}

export default AccountSettings
