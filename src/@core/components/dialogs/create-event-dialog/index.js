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
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { async } from '@firebase/util'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
// import Dropzone from 'react-dropzone'



const CreateEventDialog = props => {
  const { open, handleClose, onNeedReloadTable, data } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [descriptionParticipant, setDescriptionParticipant] = useState('')
  const [descriptionRequired, setDescriptionRequired] = useState('')
  const [countNeedParticipate, setCountNeedParticipate] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [imageAsFiles, setImageAsFiles] = useState([])
  const [imagesAsUrl, setImagesAsUrl] = useState([])

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
  }, [data])

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleCreate = async (values) => {
    // TODO: upload anh chua xong, dang dich promise gi do
    overlayLoading.start()

    // await updateImagesToFirebase()
    console.log('imagesAsUrl', imagesAsUrl);
    const payload = {
      ...values,
      images_str: imagesAsUrl.join(',')
    }

    try {
      const res = await adminEventService.create(payload)
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

  const handleImageAsFile1 = (e) => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
  }

  const handleImageAsFile2 = (e) => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
  }

  const handleImageAsFile3 = (e) => {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
  }

  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .required('Trường này là yêu cầu nhập'),
    description: Yup.string()
      .required('Trường này là yêu cầu nhập'),
    count_need_participate: Yup.string()
      .required('Trường này là yêu cầu nhập'),
    start_at: Yup.string()
      .required('Trường này là yêu cầu nhập'),
    end_at: Yup.string()
      .required('Trường này là yêu cầu nhập'),
    address: Yup.string()
      .required('Trường này là yêu cầu nhập'),
  });

  const handleFireBaseUpload = async (file) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('progress', progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('downloadURL', downloadURL);
        const imagesAsUrlTemp = [...imagesAsUrl]
        imagesAsUrlTemp.push(downloadURL)
        setImagesAsUrl(imagesAsUrlTemp);
      }
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>TẠO SỰ KIỆN MỚI</DialogTitle>
      <Formik
        initialValues={{
          title: '',
          description: '',
          count_need_participate: '',
          start_at: '',
          end_at: '',
          address: '',
          point_number: ''
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
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <DialogContent>
              <FormTitle title='Tiêu đề:' />
              <TextField
                margin='dense'
                id='name'
                name="title"
                type='email'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p className='text-red-500'>
                <ErrorMessage name="title" />
              </p>
              <FormTitle title='Nội dung:' />
              <TextField
                margin='dense'
                id='name'
                name="description"
                fullWidth
                variant='outlined'
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p className='text-red-500'>
                <ErrorMessage name="description" />
              </p>

              <FormTitle title='Địa điểm:' />
              <TextField
                margin='dense'
                id='name'
                name="address"
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              <p className='text-red-500'>
                <ErrorMessage name="address" />
              </p>

              <FormTitle title='Đối tượng tham gia:' />
              <TextField
                margin='dense'
                id='name'
                name="description_participant"
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
                name="description_required"
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
                name="count_need_participate"
                type='number'
                fullWidth
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.count_need_participate}
              />
              <p className='text-red-500'>
                <ErrorMessage name="count_need_participate" />
              </p>

              <FormTitle title='Số điểm đạt được:' />
              <TextField
                margin='dense'
                id='name'
                name="point_number"
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
                    name="start_at"
                    sx={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start_at}
                  />
                  <p className='text-red-500'>
                    <ErrorMessage name="start_at" />
                  </p>
                </Grid>
                <Grid item xs={3}>
                  <FormTitle title='Thời gian kết thúc:' />
                  <TextField
                    id='date'
                    type='date'
                    name="end_at"
                    sx={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end_at}
                  />
                  <p className='text-red-500'>
                    <ErrorMessage name="end_at" />
                  </p>
                </Grid>
              </Grid>
              <FormTitle title='Tải ảnh 1:' />
              <TextField
                type="file"
                onChange={handleImageAsFile1}
              />
              <FormTitle title='Tải ảnh 2:' />
              <TextField
                type="file"
                onChange={handleImageAsFile2}
              />
              <FormTitle title='Tải ảnh 3:' />
              <TextField
                type="file"
                onChange={handleImageAsFile3}
              />


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
