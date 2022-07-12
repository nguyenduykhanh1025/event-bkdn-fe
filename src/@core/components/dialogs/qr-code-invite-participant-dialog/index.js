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
import QRCode from 'react-qr-code'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

const CreateJournalDialog = props => {
  const hrefCurrent = window.location.href.split('/')
  const { open, handleClose, eventId } = props
  const [urlJoinEvent, setUrlJoinEvent] = useState(
    `${hrefCurrent[0]}//${hrefCurrent[2]}/join-to-event/${eventId}`
  )

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
      <DialogTitle>MỜI THÀNH VIÊN BẰNG QR CODE</DialogTitle>
      <DialogContent>
        <QRCode value={urlJoinEvent} className='w-1/4 m-auto' />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Thoát</Button>
      </DialogActions>
    </Dialog>
  )
}

CreateJournalDialog.propTypes = {}

export default CreateJournalDialog
