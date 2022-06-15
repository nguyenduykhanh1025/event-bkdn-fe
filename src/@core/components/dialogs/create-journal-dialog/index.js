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
import { adminEventService, adminJournalService, eventService } from 'src/@core/services'
import overlayLoading from 'src/@core/utils/overlay-loading'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from 'src/@core/utils/firebase'

const CreateJournalDialog = props => {
  const { open, handleClose, onNeedReloadTable, data } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagesAsUrl, setImagesAsUrl] = useState([])

  useEffect(() => {
    setTitle(data ? data.title : '')
    setDescription(data ? data.description : '')
  }, [data])

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleCreate = async () => {
    const payload = {
      title: title,
      description: description,
      images_str: imagesAsUrl.join(',')
    }

    try {
      overlayLoading.start()
      const res = await adminJournalService.create(payload)
      console.log('res', res)
      onNeedReloadTable()
    } catch (err) {
      console.log(err)
    } finally {
      overlayLoading.stop()
    }
  }

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
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

        <FormTitle title='Tải ảnh:' />
        <TextField
          type="file"
          onChange={handleImageAsFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Thoát</Button>
        <Button onClick={handleCreate}>{data ? 'Sửa' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateJournalDialog.propTypes = {}

export default CreateJournalDialog
