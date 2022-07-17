import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TitleHeaderPage from 'src/@core/components/title-header-page'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  Icon,
  Input,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField
} from '@mui/material'
import FileIcon from 'mdi-material-ui/File'
import EyeIcon from 'mdi-material-ui/Eye'
import QrcodeIcon from 'mdi-material-ui/Qrcode'
import ApplicationEditIcon from 'mdi-material-ui/ApplicationEdit'
import DeleteIcon from 'mdi-material-ui/Delete'
import Slide from '@mui/material/Slide'
import ParticipantsEventDialog from 'src/@core/components/dialogs/participants-event-dialog'
import AccountMultiplePlusIcon from 'mdi-material-ui/AccountMultiplePlus'
import { adminEventService } from 'src/@core/services'
import { showConfirm } from 'src/@core/utils/alert-notify-helper'
import CreateEventDialog from 'src/@core/components/dialogs/create-event-dialog'
import IconButton from '@mui/material/IconButton'
import QrCodeInviteParticipantDialog from 'src/@core/components/dialogs/qr-code-invite-participant-dialog'
import overlayLoading from 'src/@core/utils/overlay-loading'
import router from 'next/router'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EventManagementDetail = props => {
  const [eventId, setEventId] = useState('')
  const [open, setOpen] = useState(false)
  const [eventDetail, setEventDetail] = useState({})
  const [isOpenCreateEventDialog, setIsOpenCreateEventDialog] = useState(false)
  const [isOpenInviteParticipantByQrCode, setIsOpenInviteParticipantByQrCode] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    getEventByID()
  }, [])

  const getEventByID = async () => {
    try {
      setEventId(router.router.query.id)
      const res = await adminEventService.show(router.router.query.id)
      setEventDetail(res.data.data)
      buildImageStr(res.data.data.images_str)
    } catch (err) {
    } finally {
    }
  }

  const buildImageStr = imageStr => {
    setImages(imageStr.split(','))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onClickWatchParticipant = () => {
    handleClickOpen()
  }

  const onCLickDeleteEvent = () => {
    showConfirm(
      'Bạn muốn xóa trường này',
      async () => {
        try {
          overlayLoading.start()
          await adminEventService.delete(eventId)
          router.back()
        } catch (err) {
          console.log('err', err)
        } finally {
          overlayLoading.stop()
        }
      },
      () => {
        console.log('oh no')
      }
    )
  }

  return (
    <>
      <TitleHeaderPage title='Sự Kiện Chi Tiết' />

      <Grid container spacing={7}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className='float-right mb-5'>
                    <span className='ml-2'>
                      <Button
                        variant='contained'
                        size='small'
                        color='info'
                        startIcon={<EyeIcon />}
                        onClick={onClickWatchParticipant}
                      >
                        Xem Thành Viên
                      </Button>
                    </span>
                    <span className='ml-2'>
                      <Button
                        variant='contained'
                        size='small'
                        startIcon={<ApplicationEditIcon />}
                        color='secondary'
                        disabled={new Date(eventDetail.end_at) < new Date() ? true : false}
                        onClick={() => setIsOpenCreateEventDialog(true)}
                      >
                        Sửa
                      </Button>
                    </span>
                    <span className='ml-2'>
                      {!eventDetail.count_participated ? (
                        <Button
                          variant='contained'
                          size='small'
                          color='error'
                          startIcon={<DeleteIcon />}
                          onClick={onCLickDeleteEvent}
                          disabled={new Date(eventDetail.end_at) < new Date() ? true : false}
                        >
                          Xóa
                        </Button>
                      ) : null}
                    </span>
                    <span className='ml-2'>
                      <IconButton
                        color='info'
                        aria-label='upload picture'
                        component='span'
                        onClick={() => setIsOpenInviteParticipantByQrCode(true)}
                      >
                        <QrcodeIcon />
                      </IconButton>
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Tiêu Đề:</span>
                  <span className='font-bold'>{eventDetail.title}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>SL.Tham Gia:</span>
                  <span className='font-bold'>{eventDetail.count_need_participate}</span>
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>SL.Đã Đăng Kí:</span>
                  <span className='font-bold'>{eventDetail.count_registered}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>TG.Bắt Đầu:</span>
                  <span className='font-bold'>{eventDetail.start_at}</span>
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>TG.Kết Thúc:</span>
                  <span className='font-bold'>{eventDetail.end_at}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Nội Dung:</span>
                  <span className='font-bold'>{eventDetail.description}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Địa Điểm:</span>
                  <span className='font-bold'>{eventDetail.address}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Đối tượng tham gia:</span>
                  <span className='font-bold'>{eventDetail.description_participant}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Yêu cầu:</span>
                  <span className='font-bold'>{eventDetail.description_required}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <img src={images[0]} loading='lazy' />
            </Grid>
            <Grid item xs={6}>
              <img src={images.length >= 1 ? images[1] : null} loading='lazy' />
            </Grid>
            <Grid item xs={6}>
              <img src={images.length >= 2 ? images[2] : null} loading='lazy' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
          maxWidth='xl'
        >
          <ParticipantsEventDialog handleClose={handleClose} open={open} eventId={eventId} />
        </Dialog>
        <CreateEventDialog
          open={isOpenCreateEventDialog}
          handleClose={() => setIsOpenCreateEventDialog(false)}
          onNeedReloadTable={async () => {
            setIsOpenCreateEventDialog(false)
            await getEventByID()
          }}
          data={eventDetail}
        />
        <QrCodeInviteParticipantDialog
          open={isOpenInviteParticipantByQrCode}
          handleClose={() => setIsOpenInviteParticipantByQrCode(false)}
          eventId={eventId}
        />
      </div>
    </>
  )
}

EventManagementDetail.propTypes = {}

export default EventManagementDetail
