import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: 'admin'
}

// ** Creating slice for acl role

const acl_slice = createSlice({
  name: 'acl_role',
  initialState,
  reducers: {
    handleChangeRole: (state, action) => {
      state.role = action.payload
    }
  }
})

// ** export slice action and reducers

export const { handleChangeRole } = acl_slice.actions

export default acl_slice.reducer
