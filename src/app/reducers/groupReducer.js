import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BOARD_API, GROUP_API, TASK_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getGroupData = createAsyncThunk('groupManagement/getGroupData', async ({ accessToken, id }) => {
    try {
        const res = await axios.get(`${BOARD_API}/${id}/groups`, {
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

export const createTaskInGroup = createAsyncThunk('groupManagement/createTask', async ({ accessToken, data }) => {
    try {
        const res = await axios.post(TASK_API, data, {
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

export const deleteTaskInGroup = createAsyncThunk('groupManagement/deleteTask', async ({ accessToken, id }, { rejectWithValue }) => {
    try {
        await axios.delete(`${TASK_API}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return id
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.status)
    }
})

export const createGroup = createAsyncThunk('groupManagement/createGroup', async ({ accessToken, data }) => {
    try {
        const res = await axios.post(GROUP_API, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteGroup = createAsyncThunk('groupManagement/deleteGroup', async ({ accessToken, id }) => {
    try {
        await axios.delete(`${GROUP_API}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return id
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
                state.status = 'updating'
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
            .addCase(createGroup.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
            .addCase(createGroup.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(deleteGroup.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = state.data.filter(group => group.id != action.payload)
            })
            .addCase(deleteGroup.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateTaskInGroup.pending, (state) => {
                state.status = 'updating'
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
            .addCase(deleteTaskInGroup.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(deleteTaskInGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data.forEach(group => {
                    group.tasks = group.tasks.filter(task => task.id != action.payload)
                })
            })
            .addCase(deleteTaskInGroup.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createTaskInGroup.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(createTaskInGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data[state.data.findIndex(x => x.id == action.payload.groupId)].tasks.push(action.payload)
            })
            .addCase(createTaskInGroup.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectGroupData = state => state.groupManagement.data

export const selectGroupStatus = state => state.groupManagement.status

export default groupManagementSlice.reducer