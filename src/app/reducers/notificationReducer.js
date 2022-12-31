import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BOARD_API, NOTIFICATION_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getNotification = createAsyncThunk('notificationManagement/getNotification', async (accessToken) => {
    try {
        const res = await axios.get(NOTIFICATION_API, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const setReadNotification = createAsyncThunk('notificationManagement/updateNotification', async ({ accessToken, ids }) => {
    try {
        await axios.put(NOTIFICATION_API, ids, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return ids
    } catch (error) {
        console.log(error)
    }
})

export const sendInvitation = createAsyncThunk('notificationManagement/sendInvitation', async ({ accessToken, boardId, ids }) => {
    try {
        await axios.post(`${BOARD_API}/${boardId}/users`, ids, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return ids
    } catch (error) {
        console.log(error)
    }
})

export const notificationManagementSlice = createSlice({
    name: 'notificationManagement',
    initialState: initialState,
    reducers: {
        receiveNotification: (state, action) => {
            console.log(action.payload)
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getNotification.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getNotification.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(setReadNotification.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(setReadNotification.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data.forEach(element => {
                    if (action.payload.find(id => id == element.id))
                        element.isRead = true
                })
            })
            .addCase(setReadNotification.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(sendInvitation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(sendInvitation.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(sendInvitation.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { receiveNotification } = notificationManagementSlice.actions

export const selectNotificationData = state => state.notificationManagement.data

export const selectNewNotificationCount = state => (state.notificationManagement.data && state.notificationManagement.data.length > 0) ? state.notificationManagement.data.filter(notification => notification.isRead == false).length : 0

export const selectNotificationStatus = state => state.notificationManagement.status

export default notificationManagementSlice.reducer