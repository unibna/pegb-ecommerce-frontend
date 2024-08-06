import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../Slices/authSlice';
import userReducer from '../Slices/userSlice'

const rootReducer = {
  auth: authReducer,
  user: userReducer,
}
export type RootState = ReturnType<any>

export const store = configureStore({
  reducer: rootReducer,
})
