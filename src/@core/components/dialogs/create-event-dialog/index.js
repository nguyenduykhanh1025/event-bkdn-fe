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

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const CreateEventDialog = props => {
  const { open, handleClose, onNeedReloadTable, data } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [descriptionParticipant, setDescriptionParticipant] = useState('')
  const [descriptionRequired, setDescriptionRequired] = useState('')
  const [countNeedParticipate, setCountNeedParticipate] = useState('')
  const [pointNumber, setPointNumber] = useState('')
  const [idManagerEvent, setIdManagerEvent] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [imageAsFiles, setImageAsFiles] = useState([])
  const [imagesAsUrl, setImagesAsUrl] = useState([])
  const [minDateTimeStart, setMinDateTimeStart] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [maxDateTimeStart, setMaxDateTimeStart] = useState(moment(new Date()).format('YYYY-MM-DD'))

  const [isLoadingUpdateFiles, setIsLoadingUpdateFiles] = useState([false, false, false])

  const [managerEvents, setManagerEvents] = useState([])

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

    getAllManagerEvent()
  }, [data])

  const handleChange = newValue => {
    setValue(newValue)
  }

  const getAllManagerEvent = async () => {
    try {
      overlayLoading.start()
      const res = await adminManagerEventService.index()
      setManagerEvents(res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      overlayLoading.stop()
    }
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
    address: Yup.string().required('Trường này là yêu cầu nhập'),
    id_manager_event: Yup.string().required('Trường này là yêu cầu nhập')
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>{data ? 'SỬA SỰ KIỆN' : 'TẠO SỰ KIỆN MỚI'}</DialogTitle>
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
          description_required: descriptionRequired,
          id_manager_event: idManagerEvent
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
              <FormTitle title='Tiêu đề:' />
              <TextField
                margin='dense'
                id='name'
                name='title'
                type='email'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p className='text-red-500'>
                <ErrorMessage name='title' />
              </p>
              <FormTitle title='Nội dung:' />
              <TextField
                margin='dense'
                id='name'
                name='description'
                fullWidth
                variant='outlined'
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p className='text-red-500'>
                <ErrorMessage name='description' />
              </p>

              <FormTitle title='Địa điểm:' />
              <TextField
                margin='dense'
                id='name'
                name='address'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              <p className='text-red-500'>
                <ErrorMessage name='address' />
              </p>

              <FormTitle title='Đối tượng tham gia:' />
              <TextField
                margin='dense'
                id='name'
                name='description_participant'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description_participant}
              />

              <FormTitle title='Yêu cầu:' />
              <TextField
                margin='dense'
                id='name'
                name='description_required'
                fullWidth
                variant='outlined'
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description_required}
              />

              <FormTitle title='Số lượng tham gia:' />
              <TextField
                margin='dense'
                id='name'
                name='count_need_participate'
                type='number'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.count_need_participate}
              />
              <p className='text-red-500'>
                <ErrorMessage name='count_need_participate' />
              </p>

              <FormTitle title='Số điểm đạt được:' />
              <TextField
                margin='dense'
                id='name'
                name='point_number'
                type='number'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.point_number}
              />

              <Grid container spacing={3}>
                <Grid item xs={3}>
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
                </Grid>
                <Grid item xs={3}>
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
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <FormTitle title='Người phụ trách:' />
                  <FormControl fullWidth>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={values.id_manager_event}
                      onChange={handleChange}
                      name='id_manager_event'
                    >
                      {managerEvents.map(item => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                  <p className='text-red-500'>
                    <ErrorMessage name='id_manager_event' />
                  </p>
                </Grid>
              </Grid>

              <FormTitle title='Tải ảnh 1:' />
              <Box sx={{ width: '30%' }}>
                <TextField type='file' onChange={handleImageAsFile1}></TextField>
                {isLoadingUpdateFiles[0] ? <LinearProgress /> : null}
              </Box>

              <FormTitle title='Tải ảnh 2:' />
              <Box sx={{ width: '30%' }}>
                <TextField type='file' onChange={handleImageAsFile2} />
                {isLoadingUpdateFiles[1] ? <LinearProgress /> : null}
              </Box>
              <FormTitle title='Tải ảnh 3:' />
              <Box sx={{ width: '30%' }}>
                <TextField type='file' onChange={handleImageAsFile3} />
                {isLoadingUpdateFiles[2] ? <LinearProgress /> : null}
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

CreateEventDialog.propTypes = {}

export default CreateEventDialog
