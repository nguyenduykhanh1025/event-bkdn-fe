// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { getIdUserFromJWT } from 'src/@core/utils/jwt-helper'
import { adminUserService } from 'src/@core/services'
import { async } from '@firebase/util'
import overlayLoading from 'src/@core/utils/overlay-loading'
import { showAlertSuccess } from 'src/@core/utils/alert-notify-helper'
import { storage } from 'src/@core/utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserInformationFromAPI()
  }, [])

  const getUserInformationFromAPI = async () => {
    try {
      overlayLoading.start()
      const res = await adminUserService.getById(getIdUserFromJWT())
      setUser(res.data.data)
      setImgSrc(res.data.data.avatar)
    } catch (err) {
      console.log(err)
    } finally {
      overlayLoading.stop()
    }
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      handleFireBaseUpload(files[0])
    }
  }

  const onClickSave = async () => {
    const payload = {
      last_name: user.last_name,
      first_name: user.first_name
    }

    try {
      overlayLoading.start()
      await adminUserService.update(user.id, payload)
      showAlertSuccess('L??u th??nh c??ng!')
    } catch (err) {
      console.log(err)
    } finally {
      overlayLoading.stop()
    }
  }

  const handleFireBaseUpload = async file => {
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    overlayLoading.start()
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log('progress', progress)
      },
      error => {
        alert(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setImgSrc(downloadURL)
        await updateAvatar(downloadURL)
      }
    )
  }

  const updateAvatar = async imgAvatar => {
    try {
      const payload = {
        avatar: imgAvatar
      }
      await adminUserService.updateAvatar(payload)
    } catch (err) {
    } finally {
      overlayLoading.stop()
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled
                  component='label'
                  variant='contained'
                  htmlFor='account-settings-upload-image'
                >
                  T???i L??n
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {/* <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled> */}
                {/* <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography> */}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              // label='H???'
              placeholder='H???'
              defaultValue={user.first_name}
              value={user.first_name}
              onChange={e => {
                setUser({ ...user, first_name: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              // label='T??n'
              placeholder='T??n'
              defaultValue={user.last_name}
              value={user.last_name}
              onChange={e => {
                setUser({ ...user, last_name: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              type='email'
              // label='Email'
              placeholder='johnDoe@example.com'
              value={user.email}
              onChange={e => {
                setUser({ ...user, email: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={onClickSave}>
              L??u Thay ?????i
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
