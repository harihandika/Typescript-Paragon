import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  twoFactorOption: '',
  password: '',
  otp: '',
  twoFactor: ''
}

// ** Creating slice for acl role

const loginCredentials = createSlice({
  name: 'loginCredentials',
  initialState,
  reducers: {
    handleUserName: (state, action) => {
      state.username = action.payload.username
    },
    handlePassword: (state, action) => {
      state.password = action.payload.password
    },
    handleTwoFactorOption: (state, action) => {
      state.twoFactorOption = action.payload.twoFactorOption
    }
  }
})

// ** export slice action and reducers

export const { handleUserName, handleTwoFactorOption } = loginCredentials.actions

export default loginCredentials.reducer
