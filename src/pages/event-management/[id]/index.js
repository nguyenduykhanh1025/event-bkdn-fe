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
import ApplicationEditIcon from 'mdi-material-ui/ApplicationEdit'
import DeleteIcon from 'mdi-material-ui/Delete'
import Slide from '@mui/material/Slide'
import ParticipantsEventDialog from 'src/@core/components/dialogs/participants-event-dialog'
import AccountMultiplePlusIcon from 'mdi-material-ui/AccountMultiplePlus'
import { adminEventService } from 'src/@core/services'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EventManagementDetail = props => {
  const [eventId, setEventId] = useState(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  )
  const [open, setOpen] = useState(false)
  const [eventDetail, setEventDetail] = useState({})

  useEffect(async () => {
    console.log('------------')
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
                      >
                        Xóa
                      </Button>
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
                src='https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/278709738_1954934534707345_4681202616317384827_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=dOEz6H_SZ-4AX_qCbuy&tn=BefvewHra5AZP9lT&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-XdZRXEITNaJjC7VurVOlouljfHOJTLwjkjeHSrChZ-Q&oe=626681A5'
                loading='lazy'
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src='https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/278721602_1954934488040683_2123934332847918283_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=6MtqdSL6XecAX8UqE_3&_nc_ht=scontent.fhan3-3.fna&oh=00_AT9DmuWiKI8Ij3ilIUiJB38Bz_J7_wVQnK2kTgGcLB_VDQ&oe=626528DE'
                loading='lazy'
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src='https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/278723958_1954934388040693_2700868716114681778_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=SowzhOV49kAAX8tjhaO&tn=BefvewHra5AZP9lT&_nc_ht=scontent.fhan3-5.fna&oh=00_AT8BaoKVLHT6MPDkiBF57y02iSvNZ5hZVyqwcc5G3krr4Q&oe=6266128C'
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
      </div>
    </>
  )
}

EventManagementDetail.propTypes = {}

export default EventManagementDetail
