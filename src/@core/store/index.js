import { configureStore } from '@reduxjs/toolkit'

import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: { ui: uiReducer.reducer }
})

// const AppDispatch = store.dispatch
// const RootState = store.getState

// export { AppDispatch, RootState, store }
