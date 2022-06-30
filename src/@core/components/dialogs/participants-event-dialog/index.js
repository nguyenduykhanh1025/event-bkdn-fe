import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { adminUserService, adminEventUserService } from 'src/@core/services'
import { showConfirm } from 'src/@core/utils/alert-notify-helper'
import overlayLoading from 'src/@core/utils/overlay-loading'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const userApplyToEventDialog = props => {
  const { handleClose, eventId } = props
  const [users, setUsers] = useState([])
  const [idSeletedCurrent, setIdSelectedCurrent] = useState(null)
  const [isNeedReloadTable, setIsNeedReloadTable] = useState(false)

  useEffect(() => {
    getUsersByIdEventFromAPI()
  }, [isNeedReloadTable, eventId])

  const getUsersByIdEventFromAPI = async () => {
    try {
      const res = await adminUserService.getUsersByIdEvent(eventId)
      setUsers(res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  const renderChipStatus = status => {
    if (status === 'ACCEPTED') {
      return <Chip label='đã tham gia' color='success' />
    } else if (status === 'IN_PROGRESS') {
      return <Chip label='đang chờ' color='primary' />
    } else {
      return <Chip label='đã từ chối' color='error' />
    }
  }

  const acceptJoinUserToEvent = id => {
    setIdSelectedCurrent(id)
    showConfirm(
      'Chấp nhận thành viên tham gia sự kiện?',
      () => {
        acceptedUserJoinToEvent()
      },
      () => {}
    )
  }

  const acceptedUserJoinToEvent = async () => {
    console.log(idSeletedCurrent)
    try {
      overlayLoading.start()
      const payload = {
        id: idSeletedCurrent
      }
      await adminEventUserService.acceptedUserJoinToEvent(payload)
      setIsNeedReloadTable(!isNeedReloadTable)
    } catch (err) {
    } finally {
      overlayLoading.stop()
    }
  }

  const rejectJoinUserToEvent = id => {
    setIdSelectedCurrent(id)
    const userExist = users.find(item => item.id == id)
    if (!userExist) return

    const payload = {
      id_user: userExist.id_user,
      id_event: userExist.id_event
    }
    showConfirm(
      'Từ chối thành viên tham gia sự kiện?',
      async () => {
        try {
          overlayLoading.start()
          await adminEventUserService.rejectedUserJoinToEvent(payload)
          setIsNeedReloadTable(!isNeedReloadTable)
        } catch (err) {
        } finally {
          overlayLoading.stop()
        }
      },
      () => {}
    )
  }

  const renderButtonStatus = (status, id) => {
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      return null
    }
    return (
      <>
        <Button
          size='small'
          variant='outlined'
          sx={{ marginRight: 2 }}
          onClick={() => acceptJoinUserToEvent(id)}
        >
          Chấp Nhận
        </Button>
        <Button
          size='small'
          variant='outlined'
          color='error'
          onClick={() => rejectJoinUserToEvent(id)}
        >
          Từ Chối
        </Button>
      </>
    )
  }

  return (
    <>
      <DialogTitle>{'Xem Thành Viên'}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell align='center'>MSSV</TableCell>
                <TableCell align='left'>Email</TableCell>
                <TableCell align='left'>SDT</TableCell>
                <TableCell align='center'>Trạng Thái</TableCell>
                <TableCell align='center'>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(row => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell align='center'>{row.id_student}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phone_number}</TableCell>
                  <TableCell align='center'>{renderChipStatus(row.status)}</TableCell>
                  <TableCell align='center'>{renderButtonStatus(row.status, row.id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </>
  )
}

userApplyToEventDialog.propTypes = {}

export default userApplyToEventDialog
