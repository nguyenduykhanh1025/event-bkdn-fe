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
import { adminManagerEventService, adminUserService } from 'src/@core/services'
import { useEffect, useState } from 'react'
import overlayLoading from 'src/@core/utils/overlay-loading'
import CreateManagerDialog from 'src/@core/components/dialogs/create-manager-dialog'

function createData(id, name, mssv, phoneNumber, email, birthDate) {
  return { id, name, mssv, phoneNumber, email, birthDate }
}

const AccountSettings = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState({})
  const [isOpenCreateEventDialog, setIsOpenCreateEventDialog] = useState(false)
  const [isNeedReload, setIsNeedReload] = useState(false)

  useEffect(async () => {
    await getJournalsFromAPI({})
  }, [isNeedReload])

  const onClickGoToDetail = id => {
    router.push(`/participant-management/${id}`)
  }

  const getJournalsFromAPI = async params => {
    try {
      overlayLoading.start()
      const res = await adminManagerEventService.paginate(params)
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

  const onClickCreateNewManager = () => {
    setIsOpenCreateEventDialog(true)
  }

  return (
    <>
      <TitleHeaderPage title='Quản Lý Tài Khoản Người Phụ Trách' />
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <Button
                variant='contained'
                sx={{ marginRight: 3.5, float: 'right' }}
                onClick={onClickCreateNewManager}
              >
                Thêm Người Phụ Trách
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell align='center'>Ảnh</TableCell>
                      <TableCell align='left'>Tên</TableCell>
                      <TableCell align='left'>Email</TableCell>
                      <TableCell align='center'>Số Điện Thoại</TableCell>
                      <TableCell align='center'>Miêu Tả Thêm</TableCell>
                      {/* <TableCell align='center'>Hành Động</TableCell> */}
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
                            <Avatar alt='Remy Sharp' src={row.avatar} />
                          </div>
                        </TableCell>
                        <TableCell align='left'>{`${row.name}`}</TableCell>
                        <TableCell align='left'>{row.email}</TableCell>
                        <TableCell align='center'>{row.phone_number}</TableCell>
                        <TableCell align='left'>{row.description}</TableCell>
                        {/* <TableCell align='center'>
                          <div>
                            <Button
                              variant='outlined'
                              size='small'
                              endIcon={<ArrowRightThinIcon />}
                              onClick={() => onClickGoToDetail(row.id)}
                            >
                              Chi Tiết
                            </Button>
                          </div>
                        </TableCell> */}
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

      <CreateManagerDialog
        open={isOpenCreateEventDialog}
        handleClose={() => setIsOpenCreateEventDialog(false)}
        onNeedReloadTable={() => {
          setIsOpenCreateEventDialog(false)
          setIsNeedReload(!isNeedReload)
        }}
      />
    </>
  )
}

export default AccountSettings
