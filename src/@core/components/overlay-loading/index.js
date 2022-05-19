import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'

const OverlayLoading = props => {
  const overlayLoadingInStore = useSelector(state => state.ui.overlayLoading)
  console.log('overlayLoadingInStore', overlayLoadingInStore)
  return (
    <>
      {overlayLoadingInStore ? (
        <div class='top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center absolute'>
          <CircularProgress color='primary' />
        </div>
      ) : null}
    </>
  )
}

OverlayLoading.propTypes = {}

export default OverlayLoading
