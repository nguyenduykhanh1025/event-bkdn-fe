import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, Grid } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { adminUserService, adminEventUserService, adminEventService } from 'src/@core/services'
import { showConfirm } from 'src/@core/utils/alert-notify-helper'
import overlayLoading from 'src/@core/utils/overlay-loading'

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const userApplyToEventDialog = props => {
    const { handleClose, userId } = props
    const [events, setEvents] = useState([])
    const [idSeletedCurrent, setIdSelectedCurrent] = useState(null);
    const [isNeedReloadTable, setIsNeedReloadTable] = useState(false);
    const [totalPointNumber, setTotalPointNumber] = useState(0)

    useEffect(() => {
        getEventsByUserID()
    }, [isNeedReloadTable, userId])

    const getEventsByUserID = async () => {
        try {
            const res = await adminEventService.getEventsJoinByIdUser(userId);
            setEvents(res.data.data)
            buildTotalPointNumber(res.data.data)
        } catch (err) { console.log(err) }
        finally {
        }
    }

    const buildTotalPointNumber = (events) => {
        let total = 0;
        for (let i = 0; i < events.length; ++i) {
            total += events[i].point_number
        }
        setTotalPointNumber(total)
    }

    const renderChipStatus = (status) => {
        if (status === 'ACCEPTED') {
            return <Chip label="đã tham gia" color="success" />
        } else if (status === 'IN_PROGRESS') {
            return <Chip label="đang chờ" color="primary" />
        } else {
            return <Chip label="đã từ chối" color="error" />
        }
    }

    const acceptJoinUserToEvent = (id) => {
        setIdSelectedCurrent(id)
        showConfirm(
            'Chấp nhận thành viên tham gia sự kiện?',
            () => {
                acceptedUserJoinToEvent();
            },
            () => {
            }
        )
    }

    const acceptedUserJoinToEvent = async () => {
        try {
            overlayLoading.start()
            const payload = {
                id: idSeletedCurrent
            }
            await adminEventUserService.acceptedUserJoinToEvent(payload)
            setIsNeedReloadTable(!isNeedReloadTable);
        } catch (err) {
        } finally {
            overlayLoading.stop()
        }
    }

    const rejectJoinUserToEvent = (id) => {
        setIdSelectedCurrent(id)
        showConfirm(
            'Từ chối thành viên tham gia sự kiện?',
            async () => {
                try {
                    overlayLoading.start()
                    const payload = {
                        id: idSeletedCurrent
                    }
                    await adminEventUserService.rejectedUserJoinToEvent(payload)
                    setIsNeedReloadTable(!isNeedReloadTable);
                } catch (err) {
                } finally {
                    overlayLoading.stop()
                }
            },
            () => {
            }
        )
    }

    const renderButtonStatus = (status, id) => {
        if (status === 'ACCEPTED' || status === 'REJECTED') {
            return null;
        } return (
            <>
                <Button size="small" variant="outlined" sx={{ marginRight: 2 }} onClick={() => acceptJoinUserToEvent(id)}>Chấp Nhận</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => rejectJoinUserToEvent(id)}>Từ Chối</Button>
            </>
        )
    }

    return (
        <>
            <DialogTitle>{"Xem Sự Kiện Đã Tham Gia"}</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Tên</TableCell>
                                <TableCell align="left">Miêu tả</TableCell>
                                <TableCell align="center">Bắt Đầu</TableCell>
                                <TableCell align="center">Kết Thúc</TableCell>
                                <TableCell align="center">Trạng Thái</TableCell>
                                <TableCell align="center">Số Điểm Đạt Được</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {row.title}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center">{row.start_at}</TableCell>
                                    <TableCell align="left">{row.end_at}</TableCell>
                                    <TableCell align="center">
                                        {renderChipStatus(row.event_users_status)}
                                    </TableCell>
                                    <TableCell align="center">{row.point_number}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="mt-1">
                    <Grid container spacing={2} >
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6} className="">
                            <span className='font-bold float-right'>{totalPointNumber}</span>
                            <span className='mr-2 float-right'>Tổng số điểm đã đạt được:</span>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </>
    )
}

userApplyToEventDialog.propTypes = {}

export default userApplyToEventDialog
