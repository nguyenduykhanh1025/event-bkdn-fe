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
import { Avatar, Pagination, Typography } from '@mui/material'
import TitleHeaderPage from 'src/@core/components/title-header-page'
import ArrowRightThinIcon from 'mdi-material-ui/ArrowRightThin'
import { useRouter } from 'next/router'

function createData(id, name, mssv, birthDate) {
  return { id, name, mssv, birthDate }
}

const rows = [
  createData(1, 'Nguyen Duy Khánh', '102160050', '10-09-1998'),
  createData(1, 'Nguyen Duy Khánh', '102160050', '10-09-1998'),
  createData(1, 'Nguyen Duy Khánh', '102160050', '10-09-1998'),
  createData(1, 'Nguyen Duy Khánh', '102160050', '10-09-1998')
]

const AccountSettings = () => {
  const router = useRouter()

  const onClickGoToDetail = () => {
    router.push('/participant-management/12')
  }

  return (
    <>
      <TitleHeaderPage title='Quản Lý Tài Khoản Tham Gia' />
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell align='center'>Ảnh</TableCell>
                      <TableCell align='left'>Tên</TableCell>
                      <TableCell align='center'>MSSV</TableCell>
                      <TableCell align='center'>Ngày Sinh</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row' align='center'>
                          {row.id}
                        </TableCell>
                        <TableCell align='center'>
                          <div className='m-auto w-max'>
                            <Avatar
                              alt='Remy Sharp'
                              src='https://cdn.eva.vn/upload/2-2019/images/2019-04-28/con-gai-cung-va-nguoi-tinh-trong-mong-cua-kim-dung-ai-moi-la-nguyen-mau-tieu-long-nu-1-1556467395-210-width650height433.jpg'
                            />
                          </div>
                        </TableCell>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='center'>{row.mssv}</TableCell>
                        <TableCell align='center'>{row.birthDate}</TableCell>
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
