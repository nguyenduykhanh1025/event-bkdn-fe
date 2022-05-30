// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/@core/components/footers/MiscFooterIllustrations'
import { useState } from 'react'
import { eventUserService } from 'src/@core/services'
import { showAlertError, showAlertSuccess } from 'src/@core/utils/alert-notify-helper'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))



const Error500 = () => {
  const [email, setEmail] = useState('');
  const [eventId, setEventId] = useState(
    typeof window !== 'undefined'
      ? window.location.href.split('/')[window.location.href.split('/').length - 2]
      : null
  )

  const [error, setError] = useState({})

  const onCLickJoinToEvent = async () => {
    console.log('asdasdasdas', eventId);
    const payload = {
      id_event: eventId,
      email: email
    }
    try {
      await eventUserService.joinToEvent(payload)
      showAlertSuccess('Tham gia sự kiện thành công!')
    } catch (err) {
      // setError(err)
      if (err.response.data.message == 'user_does_not_exist') {
        showAlertError('Tài khoản không tồn tại!')
      }
      if (err.response.data.message == 'user_joined') {
        showAlertError('Yêu cầu tham gia của bạn đã tồn tại!')
      }
    } finally {

    }
  }

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} className='w-3/4'>
        <TextField id="outlined-basic" label="Email" variant="outlined" className='w-full' value={email} onChange={(e) => setEmail(e.target.value)} />
        {/* <div>{{error}}</div> */}

        <div className='my-10'>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={onCLickJoinToEvent}>
            Tham gia sự kiện
          </Button>
        </div>

      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree-3.png' />} />
    </Box>
  )
}
Error500.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error500
