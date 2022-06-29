import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Avatar, Button, DialogActions, Grid } from '@mui/material'
import { adminManagerEventService } from 'src/@core/services'
import { async } from '@firebase/util'

const WatchManagerEventDialog = props => {
  const { open, handleClose, onNeedReloadTable, data, idManagerEvent } = props

  const [managerEvent, setManagerEvent] = useState(null)

  useEffect(() => {
    loadManagerEvent()
  }, [idManagerEvent])

  const loadManagerEvent = async () => {
    if (!idManagerEvent) return

    try {
      const res = await adminManagerEventService.show(idManagerEvent)
      setManagerEvent(res.data.data)
    } catch (err) {
    } finally {
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
      <DialogTitle>{'THÔNG TIN NGƯỜI PHỤ TRÁCH'}</DialogTitle>
      <Avatar
        alt='Remy Sharp'
        src={managerEvent?.avatar}
        sx={{ width: 200, height: 200 }}
        className='m-auto'
      />
      <div className='mt-10 m-auto w-3/4'>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <span className='mr-2'>Tên:</span>
            <span className='font-bold'>{managerEvent?.name}</span>
          </Grid>
          <Grid item xs={12}>
            <span className='mr-2'>Email:</span>
            <span className='font-bold'>{managerEvent?.email}</span>
          </Grid>
          <Grid item xs={12}>
            <span className='mr-2'>Số Điện Thoại:</span>
            <span className='font-bold'>{managerEvent?.phone_number}</span>
          </Grid>
          <Grid item xs={12}>
            <span className='mr-2'>Miêu Tả Thêm:</span>
            <span className='font-bold'>{managerEvent?.description}</span>
          </Grid>
        </Grid>
      </div>
      <DialogActions>
        <Button onClick={handleClose}>Thoát</Button>
      </DialogActions>
    </Dialog>
  )
}

WatchManagerEventDialog.propTypes = {}

export default WatchManagerEventDialog
