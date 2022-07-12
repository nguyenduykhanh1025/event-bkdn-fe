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
  Chip,
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
import { adminJournalService } from 'src/@core/services'
import { showConfirm } from 'src/@core/utils/alert-notify-helper'
import router from 'next/router'
import overlayLoading from 'src/@core/utils/overlay-loading'
import CreateJournalDialog from 'src/@core/components/dialogs/create-journal-dialog'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const eventManagementDetail = props => {
  const [journalId, setJournalId] = useState(
    typeof window !== 'undefined'
      ? window.location.href.split('/')[window.location.href.split('/').length - 2]
      : null
  )
  const [isOpenCreateJournalDialog, setIsOpenCreateJournalDialog] = useState(false)
  const [journalDetail, setJournalDetail] = useState({})
  const [images, setImages] = useState([])

  useEffect(async () => {
    await getJournalByID()
  }, [])

  const getJournalByID = async () => {
    try {
      const res = await adminJournalService.show(journalId)
      setJournalDetail(res.data.data)
      buildImageStr(res.data.data.images_str)
    } catch (err) {
    } finally {
    }
  }

  const buildImageStr = imageStr => {
    setImages(imageStr.split(','))
  }

  const onClickDeleteNews = () => {
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

  return (
    <>
      <TitleHeaderPage title='Tin Tức Chi Tiết' />

      <Grid container spacing={7}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Chip icon={<EyeIcon />} label='69' />
                </Grid>
                <Grid item xs={10}>
                  <div className='float-right mb-5'>
                    <span className='ml-2'>
                      <Button
                        variant='contained'
                        size='small'
                        startIcon={<ApplicationEditIcon />}
                        color='secondary'
                        onClick={() => setIsOpenCreateJournalDialog(true)}
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
                        onClick={onClickDeleteNews}
                      >
                        Xóa
                      </Button>
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Tiêu Đề:</span>
                  <span className='font-bold'>{journalDetail.title}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <span className='mr-2'>Ngày Đăng:</span>
                  <span className='font-bold'> {journalDetail.posted_at}</span>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <span className='mr-2'>Nội Dung:</span>
                  <span className='font-bold'>{journalDetail.description}</span>
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
      <CreateJournalDialog
        open={isOpenCreateJournalDialog}
        handleClose={() => setIsOpenCreateJournalDialog(false)}
        onNeedReloadTable={() => {
          setIsOpenCreateJournalDialog(false)
        }}
        data={journalDetail}
      />
    </>
  )
}

eventManagementDetail.propTypes = {}

export default eventManagementDetail
