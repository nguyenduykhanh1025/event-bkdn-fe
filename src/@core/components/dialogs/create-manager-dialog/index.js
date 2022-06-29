import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormTitle } from '../../titles'
import Grid from '@mui/material/Grid'
import { adminEventService, adminManagerEventService, eventService } from 'src/@core/services'
import overlayLoading from 'src/@core/utils/overlay-loading'
import moment from 'moment'
import { storage } from 'src/@core/utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { async } from '@firebase/util'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'

const CreateManagerDialog = props => {
  const { open, handleClose, onNeedReloadTable, data } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [sex, setSex] = useState(false)
  const [avatar, setAvatar] = useState('')

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [descriptionParticipant, setDescriptionParticipant] = useState('')
  const [descriptionRequired, setDescriptionRequired] = useState('')
  const [countNeedParticipate, setCountNeedParticipate] = useState('')
  const [pointNumber, setPointNumber] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [imageAsFiles, setImageAsFiles] = useState([])
  const [imagesAsUrl, setImagesAsUrl] = useState([])
  const [minDateTimeStart, setMinDateTimeStart] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [maxDateTimeStart, setMaxDateTimeStart] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [isFemale, setIsFemale] = useState(true)

  const [isLoadingUpdateFiles, setIsLoadingUpdateFiles] = useState([false, false, false])

  useEffect(() => {
    setTitle(data ? data.title : '')
    setDescription(data ? data.description : '')
    setAddress(data ? data.address : '')
    setDescriptionParticipant(data ? data.description_participant : '')
    setDescriptionRequired(data ? data.description_required : '')
    setCountNeedParticipate(data ? data.count_need_participate : '')
    setStartDate(
      data
        ? moment(new Date(data.start_at)).format('YYYY-MM-DD')
        : moment(new Date()).format('YYYY-MM-DD')
    )
    setEndDate(
      data
        ? moment(new Date(data.end_at)).format('YYYY-MM-DD')
        : moment(new Date()).format('YYYY-MM-DD')
    )
    setPointNumber(data ? data.point_number : '')
  }, [data])

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleCreate = async values => {
    overlayLoading.start()
    const payload = {
      ...values,
      sex: isFemale,
      avatar: imagesAsUrl.join(',')
    }

    try {
      const res = data
        ? await adminManagerEventService.update({
            ...payload,
            id: data.id
          })
        : await adminManagerEventService.create(payload)
      onNeedReloadTable()
    } catch (err) {
    } finally {
      overlayLoading.stop()
    }
  }

  const updateImagesToFirebase = async () => {
    for (let i = 0; i < imageAsFiles.length; ++i) {
      await handleFireBaseUpload(imageAsFiles[i])
    }
  }

  const setLoadingFileUpdateByIndex = index => {
    let isLoadingUpdateFilesTemp = isLoadingUpdateFiles
    isLoadingUpdateFilesTemp[index] = true
    setIsLoadingUpdateFiles([...isLoadingUpdateFilesTemp])
  }

  const resetLoadingFileUpdate = () => {
    let isLoadingUpdateFilesTemp = isLoadingUpdateFiles.map(item => false)
    setIsLoadingUpdateFiles(isLoadingUpdateFilesTemp)
  }

  const handleImageAsFile1 = e => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
    setLoadingFileUpdateByIndex(0)
  }

  const handleImageAsFile2 = e => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
    setLoadingFileUpdateByIndex(1)
  }

  const handleImageAsFile3 = e => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
    setLoadingFileUpdateByIndex(2)
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Trường này là yêu cầu nhập'),
    email: Yup.string().required('Trường này là yêu cầu nhập'),
    description: Yup.string().required('Trường này là yêu cầu nhập'),
    phone_number: Yup.string().required('Trường này là yêu cầu nhập')
  })

  const handleFireBaseUpload = async file => {
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

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
        console.log('downloadURL', downloadURL)
        const imagesAsUrlTemp = [...imagesAsUrl]
        imagesAsUrlTemp.push(downloadURL)
        setImagesAsUrl(imagesAsUrlTemp)
        resetLoadingFileUpdate()
      }
    )
  }

  const handleChangeFemale = () => {
    setIsFemale(!isFemale)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>
        {data ? 'SỬA THÔNG TIN NGƯỜI PHỤ TRÁCH' : 'TẠO THÔNG TIN NGƯỜI PHỤ TRÁCH MỚI'}
      </DialogTitle>
      <Formik
        initialValues={{
          name: name,
          email: email,
          description: description,
          phone_number: phoneNumber,
          sex: sex,
          avatar: avatar
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          handleCreate(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <>
            <DialogContent>
              <FormTitle title='Tên:' />
              <TextField
                margin='dense'
                id='name'
                name='name'
                type='text'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p className='text-red-500'>
                <ErrorMessage name='name' />
              </p>

              <FormTitle title='Email:' />
              <TextField
                margin='dense'
                id='email'
                name='email'
                type='email'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className='text-red-500'>
                <ErrorMessage name='email' />
              </p>

              <FormTitle title='Số Điện Thoại:' />
              <TextField
                margin='dense'
                id='phone_number'
                name='phone_number'
                type='text'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone_number}
              />
              <p className='text-red-500'>
                <ErrorMessage name='phone_number' />
              </p>

              <FormTitle title='Miêu Tả Thêm:' />
              <TextField
                margin='dense'
                id='description'
                name='description'
                type='text'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p className='text-red-500'>
                <ErrorMessage name='description' />
              </p>

              <FormTitle title='Giới Tính:' />
              <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>Nam</Typography>
                <Switch
                  checked={isFemale}
                  onChange={handleChangeFemale}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>Nữ</Typography>
              </Stack>

              <Grid container spacing={3}></Grid>
              <FormTitle title='Ảnh Đại Diện:' />
              <Box sx={{ width: '30%' }}>
                <TextField type='file' onChange={handleImageAsFile1}></TextField>
                {isLoadingUpdateFiles[0] ? <LinearProgress /> : null}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Thoát</Button>
              <Button onClick={handleSubmit}>{data ? 'Sửa' : 'Tạo'}</Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

CreateManagerDialog.propTypes = {}

export default CreateManagerDialog
