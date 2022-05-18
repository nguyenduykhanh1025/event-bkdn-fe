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

function createData(id, title, participantCount, participantRegisteredCount, startDate, endDate) {
  return { id, title, participantCount, participantRegisteredCount, startDate, endDate }
}

const rows = [
  createData(1, 'Title 1', 20, 15, '20-12-1998', '10-09-1998'),
  createData(1, 'Title 1', 20, 15, '20-12-1998', '10-09-1998'),
  createData(1, 'Title 1', 20, 15, '20-12-1998', '10-09-1998'),
  createData(1, 'Title 1', 20, 15, '20-12-1998', '10-09-1998'),
  createData(1, 'Title 1', 20, 15, '20-12-1998', '10-09-1998')
]

const TabIncomingEvents = () => {
  const [events, setEvents] = useState([])
  const router = useRouter()

  useEffect(async () => {
    await getEventsIncomingFromAPI()
  }, [])

  const getEventsIncomingFromAPI = async () => {
    const params = {
      filter_column: 'status',
      filter_data: constants.EVENT_STATUS.INCOMING_EVENT
    }
    try {
      const res = await adminEventService.paginate(params)
      setEvents(res.data.data.items)
    } catch (err) {}
  }

  const onClickGoToDetail = () => {
    router.push('/event-management/12')
  }

  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <Button variant='contained' sx={{ marginRight: 3.5, float: 'right' }}>
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
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map(row => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                          endIcon={<ArrowRightThinIcon />}
                          onClick={onClickGoToDetail}
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
          <Pagination count={10} sx={{ float: 'right' }} color='primary' />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TabIncomingEvents
