import React from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const userApplyToEventDialog = props => {
  const { handleClose } = props

  return (
    <>
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no
          apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </>
  )
}

userApplyToEventDialog.propTypes = {}

export default userApplyToEventDialog
