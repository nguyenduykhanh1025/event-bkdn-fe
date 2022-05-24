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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EventManagementDetail = props => {
  const [eventId, setEventId] = useState(
    typeof window !== 'undefined'
      ? window.location.href.split('/')[window.location.href.split('/').length - 2]
      : null
  )
  const [open, setOpen] = useState(false)
  const [eventDetail, setEventDetail] = useState({})
  const [isOpenCreateEventDialog, setIsOpenCreateEventDialog] = useState(false)
  const [isOpenInviteParticipantByQrCode, setIsOpenInviteParticipantByQrCode] = useState(false)

  useEffect(async () => {
    await getEventByID()
  }, [])

  const getEventByID = async () => {
    try {
      const res = await adminEventService.show(eventId)
      setEventDetail(res.data.data)
    } catch (err) {
    } finally {
    }
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

          await adminJournalService.delete(journalId)
          router.back()
        } catch (err) {
        } finally {
          overlayLoading.stop()
        }
      },
      () => {
        console.log('oh no')
      }
    )
  }
  console.log('eventDetail', new Date(eventDetail.end_at) > new Date())
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
                        color='info'
                        startIcon={<AccountMultiplePlusIcon />}
                        onClick={onClickWatchParticipant}
                        disabled={new Date(eventDetail.end_at) < new Date() ? true : false}
                      >
                        Mời Thành Viên
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
                <Grid item xs={12}>
                  <span className='mr-2'>Yêu cầu thêm</span>
                  <Grid container spacing={2}>
                    <div className='w-11/12 m-auto pt-5'>
                      <Grid item xs={12}>
                        <div className='font-bold'>Điểm trung bình rèn luyện</div>
                        <div className='ml-5'>
                          <TextField id='standard-basic' label='Input' variant='standard' />
                        </div>
                      </Grid>
                    </div>
                    <div className='w-11/12 m-auto pt-5'>
                      <Grid item xs={12}>
                        <div className='font-bold'>Radios</div>
                        <div className='ml-5'>
                          <FormControl>
                            <RadioGroup
                              aria-labelledby='demo-radio-buttons-group-label'
                              defaultValue='female'
                              name='radio-buttons-group'
                            >
                              <FormControlLabel value='female' control={<Radio />} label='Female' />
                              <FormControlLabel value='male' control={<Radio />} label='Male' />
                              <FormControlLabel value='other' control={<Radio />} label='Other' />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </Grid>
                    </div>
                    <div className='w-11/12 m-auto pt-5'>
                      <Grid item xs={12}>
                        <div className='font-bold'>Selections</div>
                        <div className='ml-5'>
                          <FormControlLabel
                            label='Check 1 asdasdas das dasd asd asdas sadas das dasd adas d'
                            control={<Checkbox />}
                          />
                          <FormControlLabel label='Parent 2' control={<Checkbox />} />
                          <FormControlLabel label='Parent 3' control={<Checkbox />} />
                        </div>
                      </Grid>
                    </div>
                    <div className='w-11/12 m-auto pt-5'>
                      <Grid item xs={12}>
                        <div className='font-bold'>Textarea</div>
                        <div className='ml-5'>
                          <TextField fullWidth multiline minRows={3} label='Message'></TextField>
                        </div>
                      </Grid>
                    </div>
                    <div className='w-11/12 m-auto pt-5'>
                      <Grid item xs={12}>
                        <div className='font-bold'>File upload</div>
                        <div className='ml-5'>
                          <FileIcon /> File something!!!
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <img
                src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/282134769_2540910662709814_3665686713416526141_n.jpg?stp=dst-jpg_p526x296&_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=xziWMnIAWUIAX9Wwe8m&_nc_ht=scontent.fhan4-3.fna&oh=00_AT-Gv1xUHat2LgKQTdpChsFQ4vzZX9Df8k8zF_G_-IVy0g&oe=6290C695'
                loading='lazy'
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src='https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/280892324_2540492252751655_3770378080944862013_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=Mtj66Oo8ZDoAX_FDppp&_nc_oc=AQmEkPqJRzJLaHLCToGaBPiDSZ6dwgmLrQG6y_QUKLBqEDRa3fmNbcX2ft5G672XYG4&_nc_ht=scontent.fhan4-1.fna&oh=00_AT_1EHhWwcQ5f12d803yf8TDOyJCPuU8qxZftT3aSK8ydg&oe=6291256A'
                loading='lazy'
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src='https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/280721028_392662496207386_6004326837743907504_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=L46ZPETk2HEAX-DUgRN&tn=BefvewHra5AZP9lT&_nc_ht=scontent.fhan4-2.fna&oh=00_AT9cUwNd2M5jDqFaPRbAA7tTcrNjTDBflNPtzjORkyJ2og&oe=62920124'
                loading='lazy'
              />
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
        >
          <ParticipantsEventDialog handleClose={handleClose} />
        </Dialog>
        <CreateEventDialog
          open={isOpenCreateEventDialog}
          handleClose={() => setIsOpenCreateEventDialog(false)}
          onNeedReloadTable={() => {
            setIsOpenCreateEventDialog(false)
          }}
          data={eventDetail}
        />
        <QrCodeInviteParticipantDialog
          open={isOpenInviteParticipantByQrCode}
          handleClose={() => setIsOpenInviteParticipantByQrCode(false)}
        />
      </div>
    </>
  )
}

EventManagementDetail.propTypes = {}

export default EventManagementDetail
