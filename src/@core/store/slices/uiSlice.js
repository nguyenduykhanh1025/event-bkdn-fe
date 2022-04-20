import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    test: ''
  },
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload
    }
  }
})

export default uiSlice
