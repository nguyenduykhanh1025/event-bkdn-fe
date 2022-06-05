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

  const handleCreate = async () => {
    // TODO: upload anh chua xong, dang dich promise gi do
    overlayLoading.start()

    // await updateImagesToFirebase()
    console.log('imagesAsUrl', imagesAsUrl);
    const payload = {
      title: title,
      description: description,
      description_participant: descriptionParticipant,
      description_required: descriptionRequired,
      count_need_participate: 10,
      start_at: startDate,
      end_at: endDate,
      address: address,
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
    // let imageAsFilesTemp = [...imageAsFiles]
    // imageAsFilesTemp[0] = image
    // setImageAsFiles(imageAsFilesTemp)
    handleFireBaseUpload(image)
  }

  const handleImageAsFile2 = (e) => {
    const image = e.target.files[0]
    // let imageAsFilesTemp = [...imageAsFiles]
    // imageAsFilesTemp[1] = image
    // setImageAsFiles(imageAsFilesTemp)
    handleFireBaseUpload(image)
  }

  const handleImageAsFile3 = (e) => {
    const image = e.target.files[0]
    // let imageAsFilesTemp = [...imageAsFiles]
    // imageAsFilesTemp[2] = image
    // setImageAsFiles(imageAsFilesTemp)
    handleFireBaseUpload(image)
  }

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
        console.log('imagesAsUrlTemp', imagesAsUrlTemp);
      }
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>TẠO SỰ KIỆN MỚI</DialogTitle>
      <DialogContent>
        <FormTitle title='Tiêu đề:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='email'
          fullWidth
          variant='outlined'
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
        <FormTitle title='Nội dung:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='email'
          fullWidth
          variant='outlined'
          multiline
          rows={4}
          value={description}
          onChange={e => {
            setDescription(e.target.value)
          }}
        />
        <FormTitle title='Địa điểm:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='email'
          fullWidth
          variant='outlined'
          value={address}
          onChange={e => {
            setAddress(e.target.value)
          }}
        />
        <FormTitle title='Đối tượng tham gia:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='email'
          fullWidth
          variant='outlined'
          value={descriptionParticipant}
          onChange={e => {
            setDescriptionParticipant(e.target.value)
          }}
        />
        <FormTitle title='Yêu cầu:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='email'
          fullWidth
          variant='outlined'
          multiline
          rows={4}
          value={descriptionRequired}
          onChange={e => {
            setDescriptionRequired(e.target.value)
          }}
        />
        <FormTitle title='Số lượng tham gia:' />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='number'
          fullWidth
          variant='outlined'
          value={countNeedParticipate}
          onChange={e => {
            setCountNeedParticipate(e.target.value)
          }}
        />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormTitle title='Thời gian bắt đầu:' />
            <TextField
              id='date'
              type='date'
              sx={{ width: '100%' }}
              InputLabelProps={{
                shrink: true
              }}
              value={startDate}
              onChange={e => {
                setStartDate(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormTitle title='Thời gian kết thúc:' />
            <TextField
              id='date'
              type='date'
              sx={{ width: '100%' }}
              InputLabelProps={{
                shrink: true
              }}
              value={endDate}
              onChange={e => {
                setEndDate(e.target.value)
              }}
            />
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
        <Button onClick={handleCreate}>{data ? 'Sửa' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateEventDialog.propTypes = {}

export default CreateEventDialog
