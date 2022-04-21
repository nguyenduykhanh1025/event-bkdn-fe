import Card from '@mui/material/Card'
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
import { Chip, Pagination, Typography } from '@mui/material'
import TitleHeaderPage from 'src/@core/components/title-header-page'
import ArrowRightThinIcon from 'mdi-material-ui/ArrowRightThin'
import EyeIcon from 'mdi-material-ui/Eye'

import { useRouter } from 'next/router'

function createData(id, title, participantCount, participantRegisteredCount, startDate, endDate) {
  return { id, title, participantCount, participantRegisteredCount, startDate, endDate }
}

const rows = [
  createData(1, 'Title 1', '20-12-1998', 'We use selectedFiles for accessing current File...', 69),
  createData(1, 'Title 1', '20-12-1998', 'We use selectedFiles for accessing current File...', 69),
  createData(1, 'Title 1', '20-12-1998', 'We use selectedFiles for accessing current File...', 69),
  createData(1, 'Title 1', '20-12-1998', 'We use selectedFiles for accessing current File...', 69),
  createData(1, 'Title 1', '20-12-1998', 'We use selectedFiles for accessing current File...', 69)
]

const AccountSettings = () => {
  const router = useRouter()

  const onClickGoToDetail = () => {
    router.push('/news-management/12')
  }

  return (
    <>
      <TitleHeaderPage title='Quản Lý Tin Tức' />
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <Button variant='contained' sx={{ marginRight: 3.5, float: 'right' }}>
                Thêm Tin Tức
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell align='left'>Tiêu Đề</TableCell>
                      <TableCell align='center'>Nội Dung</TableCell>
                      <TableCell align='center'>Ngày Đăng</TableCell>
                      <TableCell align='center'>Số Lượt Xem</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row' align='center'>
                          {row.id}
                        </TableCell>
                        <TableCell align='left'>{row.title}</TableCell>
                        <TableCell align='center'>{row.participantRegisteredCount}</TableCell>
                        <TableCell align='center'>{row.participantCount}</TableCell>
                        <TableCell align='center'>
                          <Chip icon={<EyeIcon />} label={row.startDate} />
                        </TableCell>
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
      </Card>
    </>
  )
}

export default AccountSettings
