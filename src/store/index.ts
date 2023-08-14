import { configureStore } from '@reduxjs/toolkit'

// ** import slices

import acl_role from './apps/acl_role'
import loginCredentials from './apps/login'
import invoice from 'src/store/apps/invoice'
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'

export const store = configureStore({
  reducer: {
    acl_role,
    loginCredentials,
    invoice,
    chat,
    user
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
