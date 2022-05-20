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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

const CreateEventDialog = props => {
  const { open, handleClose } = props
  const [startDate, setStartDate] = useState(new Date('2014-08-18T21:11:54'))
  const [endDate, setEndDate] = useState(new Date('2014-08-18T21:11:54'))

  const handleChange = newValue => {
    setValue(newValue)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>TẠO SỰ KIỆN MỚI</DialogTitle>
      <DialogContent>
        <FormTitle title='Tiêu đề:' />
        <TextField autoFocus margin='dense' id='name' type='email' fullWidth variant='outlined' />
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
        />
        <FormTitle title='Địa điểm:' />
        <TextField autoFocus margin='dense' id='name' type='email' fullWidth variant='outlined' />
        <FormTitle title='Đối tượng tham gia:' />
        <TextField autoFocus margin='dense' id='name' type='email' fullWidth variant='outlined' />
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
        />
        <FormTitle title='Số lượng tham gia:' />
        <TextField autoFocus margin='dense' id='name' type='number' fullWidth variant='outlined' />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormTitle title='Thời gian bắt đầu:' />
            <DesktopDatePicker
              label='Date desktop'
              inputFormat='MM/dd/yyyy'
              value={startDate}
              onChange={handleChange}
              renderInput={params => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTitle title='Thời gian kết thúc:' />
            <DesktopDatePicker
              label='Date desktop'
              inputFormat='MM/dd/yyyy'
              value={endDate}
              onChange={handleChange}
              renderInput={params => <TextField {...params} />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateEventDialog.propTypes = {}

export default CreateEventDialog
