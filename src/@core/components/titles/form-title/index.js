import React from 'react'
import PropTypes from 'prop-types'

const FormTitle = props => {
  const { title } = props

  return <p class='text-lg font-semibold mt-6'>{title}</p>
}

FormTitle.propTypes = {}

export default FormTitle
