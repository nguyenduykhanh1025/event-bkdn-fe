import { setOverlayLoading } from 'src/@core/store/slices/uiSlice'
import { store } from 'src/@core/store'

const overlayLoading = {
  start() {
    store.dispatch(setOverlayLoading(true))
  },
  stop() {
    store.dispatch(setOverlayLoading(false))
  }
}

export default overlayLoading
