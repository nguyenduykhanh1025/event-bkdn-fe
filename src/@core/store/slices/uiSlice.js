import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    test: '',
    overlayLoading: false
  },
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload
    },
    setOverlayLoading: (state, action) => {
      state.overlayLoading = action.payload
    }
  }
})

export const { setOverlayLoading } = uiSlice.actions
export default uiSlice
