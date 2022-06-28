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
import { adminEventService, eventService } from 'src/@core/services'
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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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
    // TODO: upload anh chua xong, dang dich promise gi do
    overlayLoading.start()

    // await updateImagesToFirebase()
    console.log('imagesAsUrl', imagesAsUrl)
    const payload = {
      ...values,
      images_str: imagesAsUrl.join(',')
    }

    try {
      const res = data
        ? await adminEventService.update({
            ...payload,
            id: data.id
          })
        : await adminEventService.create(payload)
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
    title: Yup.string().required('Trường này là yêu cầu nhập'),
    description: Yup.string().required('Trường này là yêu cầu nhập'),
    count_need_participate: Yup.string().required('Trường này là yêu cầu nhập'),
    start_at: Yup.string().required('Trường này là yêu cầu nhập'),
    end_at: Yup.string().required('Trường này là yêu cầu nhập'),
    address: Yup.string().required('Trường này là yêu cầu nhập')
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
          title: title,
          description: description,
          count_need_participate: countNeedParticipate,
          start_at: startDate,
          end_at: endDate,
          address: address,
          point_number: pointNumber,
          description_participant: descriptionParticipant,
          description_required: descriptionRequired
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
                name='title'
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
                id='name'
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
                id='name'
                name='phoneNumber'
                type='text'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
              <p className='text-red-500'>
                <ErrorMessage name='phoneNumber' />
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
              <p className='text-red-500'>
                <ErrorMessage name='description' />
              </p>

              <Grid container spacing={3}>
                {/* <Grid item xs={3}>
                  <FormTitle title='Thời gian bắt đầu:' />
                  <TextField
                    id='date'
                    type='date'
                    name='start_at'
                    sx={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ inputProps: { min: minDateTimeStart } }}
                    onChange={e => {
                      handleChange(e)
                      setMaxDateTimeStart(e.target.value)
                    }}
                    onBlur={handleBlur}
                    value={values.start_at}
                  />
                  <p className='text-red-500'>
                    <ErrorMessage name='start_at' />
                  </p>
                </Grid> */}
                {/* <Grid item xs={3}>
                  <FormTitle title='Thời gian kết thúc:' />
                  <TextField
                    id='date'
                    type='date'
                    name='end_at'
                    sx={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ inputProps: { min: maxDateTimeStart } }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end_at}
                  />
                  <p className='text-red-500'>
                    <ErrorMessage name='end_at' />
                  </p>
                </Grid> */}
              </Grid>
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
