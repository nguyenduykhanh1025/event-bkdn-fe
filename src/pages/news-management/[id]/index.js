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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const eventManagementDetail = props => {
  const [journalId, setJournalId] = useState(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  )
  const [journalDetail, setJournalDetail] = useState({})

  useEffect(async () => {
    await getJournalByID()
  }, [])

  const getJournalByID = async () => {
    try {
      const res = await adminJournalService.show(journalId)
      setJournalDetail(res.data.data)
      console.log(res)
    } catch (err) {
    } finally {
    }
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
              <img
                src='https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/278186167_1957381551129310_5114887276944770370_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=weRApz55lmAAX8ovuTW&tn=BefvewHra5AZP9lT&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_DCF_EK06dp-leJoDdfrGA2nDq2Yx1bgSKfbZacVPq_g&oe=62663B30'
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
    </>
  )
}

eventManagementDetail.propTypes = {}

export default eventManagementDetail
