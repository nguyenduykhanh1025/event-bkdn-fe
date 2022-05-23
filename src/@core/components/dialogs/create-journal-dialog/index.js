import React, { useState } from 'react'
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

const CreateJournalDialog = props => {
  const { open, handleClose, onNeedReloadTable } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleCreate = async () => {
    const payload = {
      title: title,
      description: description,
      images_str: 'OKE'
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Thoát</Button>
        <Button onClick={handleCreate}>Tạo</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateJournalDialog.propTypes = {}

export default CreateJournalDialog
