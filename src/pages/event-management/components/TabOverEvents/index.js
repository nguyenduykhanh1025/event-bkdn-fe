import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Pagination } from '@mui/material'
import ArrowRightThinIcon from 'mdi-material-ui/ArrowRightThin'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { adminEventService } from 'src/@core/services'
import constants from 'src/@core/utils/constants'
import overlayLoading from 'src/@core/utils/overlay-loading'
import CreateEventDialog from 'src/@core/components/dialogs/create-event-dialog'
import WatchManagerEventDialog from 'src/@core/components/dialogs/watch-manager-event-dialog'
import AccountTieIcon from 'mdi-material-ui/AccountTie'

const PARAMS_PAGINATE_DEFAULT = {
  filter_column: 'status',
  filter_data: constants.EVENT_STATUS.INCOMING_EVENT
}

const TabIncomingEvents = () => {
  const [events, setEvents] = useState([])
  const [isOpenCreateEventDialog, setIsOpenCreateEventDialog] = useState(false)
  const [isNeedReload, setIsNeedReload] = useState(false)
  const [idManagerEventSelected, setIdManagerEventSelected] = useState(null)
  const [isOpenWatchManagerEventDialog, setIsOpenWatchManagerEventDialog] = useState(false)

  const [meta, setMeta] = useState({
    currentPage: 0,
    total: 0,
    perPage: 10
  })
  const router = useRouter()

  useEffect(async () => {
    await getEventsIncomingFromAPI({
      ...PARAMS_PAGINATE_DEFAULT
    })
  }, [isNeedReload])

  const getEventsIncomingFromAPI = async params => {
    try {
      overlayLoading.start()
      const res = await adminEventService.paginateEventOver({
        ...params
      })
      setEvents(res.data.data.items)
      setMeta(res.data.data.meta)
    } catch (err) {
    } finally {
      overlayLoading.stop()
    }
  }

  const onClickGoToDetail = id => {
    router.push(`/event-management/${id}`)
  }

  const handleChangePage = async (event, newPage) => {
    const params_paginate = {
      ...PARAMS_PAGINATE_DEFAULT,
      page: newPage
    }
    await getEventsIncomingFromAPI(params_paginate)
  }

  const onClickCreateNewEvent = () => {
    setIsOpenCreateEventDialog(true)
  }

  const onClickShowManagerEvent = idManagerEvent => {
    setIsOpenWatchManagerEventDialog(true)
    setIdManagerEventSelected(idManagerEvent)
  }

  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <Button
            variant='contained'
            sx={{
              marginRight: 3.5,
              float: 'right'
            }}
            onClick={onClickCreateNewEvent}
          >
            Thêm Sự Kiện
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='left'>Tiêu Đề</TableCell>
                  <TableCell align='center'>SL.Tham Gia</TableCell>
                  <TableCell align='center'>SL.Đã Đăng Kí</TableCell>
                  <TableCell align='center'>Bắt Đầu</TableCell>
                  <TableCell align='center'>Kết Thúc</TableCell>
                  <TableCell align='center'>Người Phụ Trách</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component='th' scope='row' align='center'>
                      {row.id}
                    </TableCell>
                    <TableCell align='left'>{row.title}</TableCell>
                    <TableCell align='center'>{row.count_need_participate}</TableCell>
                    <TableCell align='center'>{row.count_registered}</TableCell>
                    <TableCell align='center'>{row.start_at}</TableCell>
                    <TableCell align='center'>{row.end_at}</TableCell>
                    <TableCell align='center'>
                      <div>
                        <Button
                          variant='outlined'
                          size='small'
                          endIcon={<AccountTieIcon />}
                          onClick={() => {
                            onClickShowManagerEvent(row.id_manager_event)
                          }}
                        >
                          Thông Tin
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell align='center'>
                      <div>
                        <Button
                          variant='outlined'
                          size='small'
                          endIcon={<ArrowRightThinIcon />}
                          onClick={() => {
                            onClickGoToDetail(row.id)
                          }}
                        >
                          Chi Tiết
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Pagination
            count={parseInt(meta.total / meta.perPage)}
            sx={{ float: 'right' }}
            color='primary'
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
      <CreateEventDialog
        open={isOpenCreateEventDialog}
        handleClose={() => setIsOpenCreateEventDialog(false)}
        onNeedReloadTable={() => {
          setIsOpenCreateEventDialog(false)
          setIsNeedReload(!isNeedReload)
        }}
      />
      <WatchManagerEventDialog
        open={isOpenWatchManagerEventDialog}
        handleClose={() => setIsOpenWatchManagerEventDialog(false)}
        onNeedReloadTable={() => {
          setIsOpenWatchManagerEventDialog(false)
        }}
        idManagerEvent={idManagerEventSelected}
      />
    </CardContent>
  )
}

export default TabIncomingEvents
