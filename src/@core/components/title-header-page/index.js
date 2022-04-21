import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Typography } from '@mui/material'

const TitleHeaderPage = props => {
  const { title } = props

  return (
    <>
      <Typography variant='h6' gutterBottom component='div' className='uppercase '>
        {title}
      </Typography>
      <Divider />
    </>
  )
}
export default TitleHeaderPage
