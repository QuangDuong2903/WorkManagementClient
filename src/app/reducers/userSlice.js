import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { GET_GOOGLE_USER_INFO_API } from "../../constant/apiURL";

export const getUserData = createAsyncThunk('userManagement/getUserData', async (data) => {
    try {
      const res = await axios.post(GET_GOOGLE_USER_INFO_API, data)
      return res.data
    } catch (error) {
      console.log(error)
    }
})

const initialState = {
  data: {
  },
  status: 'idle'
};

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

export const selectUserData = state => state.userManagement.data

export const selectUserStatus = state => state.userManagement.status

export const selectUserAccessToken = state => (state.userManagement.data ? state.userManagement.data.accessToken : '')

export default userManagementSlice.reducer