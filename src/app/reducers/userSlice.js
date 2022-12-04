import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { GET_GOOGLE_USER_INFO_API, TEST_API, CREATE_GOOGLE_USER_API } from "../../constant/apiURL";

export const getUserData = createAsyncThunk('userManagement/getUserData', async (data) => {
    try {
      const res = await axios.get(GET_GOOGLE_USER_INFO_API, { params: { email: data.email } })
      return res.data
    } catch (error) {
      if (error.response.status == 400) {
        const res = await axios.post(CREATE_GOOGLE_USER_API, data)
        return res.data
      }
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
      .addCase(getUserData.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectUserData = state => state.userManagement.data

export const selectUserStatus = state => state.userManagement.status

export default userManagementSlice.reducer