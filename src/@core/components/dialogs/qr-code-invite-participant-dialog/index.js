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

const CreateJournalDialog = props => {
  const { open, handleClose } = props

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>MỜI THÀNH VIÊN BẰNG QR CODE</DialogTitle>
      <DialogContent>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
          loading='lazy'
          className='w-1/4 m-auto'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Thoát</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateJournalDialog.propTypes = {}

export default CreateJournalDialog
