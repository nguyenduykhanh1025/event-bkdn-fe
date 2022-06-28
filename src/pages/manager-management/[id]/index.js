import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TitleHeaderPage from 'src/@core/components/title-header-page'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import FileIcon from 'mdi-material-ui/File'
import EyeIcon from 'mdi-material-ui/Eye'
import ApplicationEditIcon from 'mdi-material-ui/ApplicationEdit'
import DeleteIcon from 'mdi-material-ui/Delete'
import AlertCircleIcon from 'mdi-material-ui/AlertCircle'
import Slide from '@mui/material/Slide'
import ParticipantsEventDialog from 'src/@core/components/dialogs/participants-event-dialog'
import ParticipantsJoinedDialog from 'src/@core/components/dialogs/participants-joined-dialog'

import { showConfirm } from 'src/@core/utils/alert-notify-helper'
import { Dialog } from '@mui/material'
import { adminUserService } from 'src/@core/services'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const eventManagementDetail = props => {

  const [isOpenEventJoined, setIsOpenEventJoined] = useState(false)
  const [idUser, setIdUser] = useState(
    typeof window !== 'undefined'
      ? window.location.href.split('/')[window.location.href.split('/').length - 2]
      : null
  )
  const [userDetai, setUserDetail] = useState({})

  useEffect(async () => {
    await getUserByID()
  }, [])


  const getUserByID = async () => {
    try {
      const res = await adminUserService.getById(idUser);
      setUserDetail(res.data.data)
    } catch (err) {
    } finally {
    }
  }

  const onCLickDeleteUser = () => {
    showConfirm(
      'Bạn muốn xóa trường này',
      async () => {
        try {
          overlayLoading.start()
          router.back()
        } catch (err) {
        } finally {
          overlayLoading.stop()
        }
      },
      () => {
      }
    )
  }

  const handleCloseDialogEventJoined = () => {
    setIsOpenEventJoined(false);
  }

  const handleClickOpen = () => {
    setIsOpenEventJoined(true)
  }

  return (
    <>
      <TitleHeaderPage title='Thông Tin Chi Tiết' />

      <Grid container spacing={7}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className='float-right mb-5'>
                    <span className='ml-2'>
                      <Button onClick={handleClickOpen} variant='contained' size='small' color='info' startIcon={<EyeIcon />}>
                        Xem Sự Kiện Đã Tham Gia
                      </Button>
                    </span>
                    <span className='ml-2'>
                      <Button
                        variant='contained'
                        size='small'
                        color='error'
                        startIcon={<AlertCircleIcon />}
                        onClick={onCLickDeleteUser}
                      >
                        Xóa
                      </Button>
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Tên:</span>
                  <span className='font-bold'>Nguyễn Duy Khánh</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>MSSV:</span>
                  <span className='font-bold'>102160050</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Email:</span>
                  <span className='font-bold'>nguyenduykhanh1025@gmail.com</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>Ngày Sinh:</span>
                  <span className='font-bold'>20-12-1998</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>Số Điện Thoại:</span>
                  <span className='font-bold'>0766735782</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>Giới Tính:</span>
                  <span className='font-bold'>Nam</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Thông Tin Thêm:</span>
                  <span className='font-bold'>Yêu thích hồng cá tính</span>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <img src='/images/avatars/1.png' loading='lazy' className='rounded' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={isOpenEventJoined}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialogEventJoined}
        aria-describedby='alert-dialog-slide-description'
        maxWidth="xl"
      >
        <ParticipantsJoinedDialog handleClose={handleCloseDialogEventJoined} open={isOpenEventJoined} userId={userDetai.id} />
      </Dialog>
    </>
  )
}

eventManagementDetail.propTypes = {}

export default eventManagementDetail
