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
import { adminUserService } from 'src/@core/services'
import { useEffect, useState } from 'react'
import overlayLoading from 'src/@core/utils/overlay-loading'

function createData(id, name, mssv, phoneNumber, email, birthDate) {
  return { id, name, mssv, phoneNumber, email, birthDate }
}

const rows = [
  createData(
    1,
    'Nguyen Duy Khánh',
    '102160050',
    '0766735782',
    'nguyenduykhanh125@gmail',
    '10-09-1998'
  ),
  createData(
    1,
    'Nguyen Duy Khánh',
    '102160050',
    '0766735782',
    'nguyenduykhanh125@gmail',
    '10-09-1998'
  ),
  createData(
    1,
    'Nguyen Duy Khánh',
    '102160050',
    '0766735782',
    'nguyenduykhanh125@gmail',
    '10-09-1998'
  ),
  createData(
    1,
    'Nguyen Duy Khánh',
    '102160050',
    '0766735782',
    'nguyenduykhanh125@gmail',
    '10-09-1998'
  )
]

const AccountSettings = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState({})

  useEffect(async () => {
    await getJournalsFromAPI({})
  }, [])

  const onClickGoToDetail = () => {
    router.push('/participant-management/12')
  }

  const getJournalsFromAPI = async params => {
    try {
      overlayLoading.start()
      const res = await adminUserService.paginateParticipant(params)
      setUsers(res.data.data.items)
      setMeta(res.data.data.meta)
    } catch (err) {
    } finally {
      overlayLoading.stop()
    }
  }

  const handleChangePage = async (event, newPage) => {
    const params_paginate = {
      page: newPage
    }
    await getJournalsFromAPI(params_paginate)
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
                      <TableCell align='left'>Email</TableCell>
                      <TableCell align='center'>Số Điện Thoại</TableCell>
                      <TableCell align='center'>Ngày Sinh</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(row => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component='th' scope='row' align='center'>
                          {row.id}
                        </TableCell>
                        <TableCell align='center'>
                          <div className='m-auto w-max'>
                            <Avatar alt='Remy Sharp' src='/images/avatars/1.png' />
                          </div>
                        </TableCell>
                        <TableCell align='left'>{`${row.last_name} ${row.first_name}`}</TableCell>
                        <TableCell align='center'>{row.mssv}</TableCell>
                        <TableCell align='left'>{row.email}</TableCell>
                        <TableCell align='center'>{row.phone_number}</TableCell>
                        <TableCell align='center'>{row.birth_date}</TableCell>
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
              <Pagination
                count={parseInt(meta.total / meta.perPage)}
                sx={{ float: 'right' }}
                color='primary'
                onChange={handleChangePage}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountSettings
