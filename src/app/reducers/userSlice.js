import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {
    accessToken: '',
    displayName: '',
    photo: '',
    email: ''
  },
  status: ''
};

export const userManagementSlice = createSlice({
  name: 'user',
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

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const res = await axios.get('https://api.covid19api.com/country/vietnam?from=2022-9-01T00%3A00%3A00Z&to=2022-9-16T00%3A00%3A00Z')
  return {
    accessToken: '',
    displayName: 'Đinh Quang Dương',
    photo: 'https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c',
    email: 'quangduongptsc@gmail.com'
  }
})

export default userManagementSlice.reducer