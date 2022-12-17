import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { GET_GROUP_DATA_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getGroupData = createAsyncThunk('groupManagement/getGroupData', async ({accessToken, id}) => {
    try {
        const res = await axios.get(`${GET_GROUP_DATA_API}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const groupManagementSlice = createSlice({
    name: 'groupManagement',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getGroupData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getGroupData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getGroupData.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectGroupData = state => state.groupManagement.data

export const selectGroupStatus = state => state.groupManagement.status

export default groupManagementSlice.reducer