import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { GET_GROUP_DATA_API, GROUP_API, TASK_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getGroupData = createAsyncThunk('groupManagement/getGroupData', async ({ accessToken, id }) => {
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

export const updateGroup = createAsyncThunk('groupManagement/updateGroup', async ({ accessToken, id, data }) => {
    try {
        const res = await axios.put(`${GROUP_API}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateTaskInGroup = createAsyncThunk('groupManagement/updateTask', async ({ accessToken, id, data }) => {
    try {
        const res = await axios.put(`${TASK_API}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
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
            .addCase(getGroupData.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateGroup.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const index = state.data.findIndex(x => x.id == action.payload.id)
                state.data[index].modifiedDate = action.payload.modifiedDate
                state.data[index].name = action.payload.name
                state.data[index].color = action.payload.color
            })
            .addCase(updateGroup.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateTaskInGroup.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateTaskInGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const index = state.data.findIndex(x => x.id == action.payload.groupId)
                const taskIndex = state.data[index].tasks.findIndex(x => x.id == action.payload.id)
                state.data[index].tasks[taskIndex] = action.payload
            })
            .addCase(updateTaskInGroup.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectGroupData = state => state.groupManagement.data

export const selectGroupStatus = state => state.groupManagement.status

export default groupManagementSlice.reducer