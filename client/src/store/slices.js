import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'slice1',
  initialState: {
    users_token:""
  },
  reducers: {
    set_user_token: (state,action) => {
        return localStorage.setItem("users",action.payload)
    },
    remove_user_token:(state,action)=>{

    }
  },
})

// Action creators are generated for each case reducer function
export const { set_user_token, remove_user_token } = counterSlice.actions

export default counterSlice.reducer