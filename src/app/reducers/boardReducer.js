import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BOARD_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getBoardData = createAsyncThunk('boardManagement/getBoardData', async (accessToken) => {
    try {
        const res = await axios.get(BOARD_API, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateBoard = createAsyncThunk('boardManagement/updateBoard', async ({ accessToken, id, data }) => {
    try {
        const res = await axios.put(`${BOARD_API}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const createBoard = createAsyncThunk('boardManagement/createBoard', async ({ accessToken, data }) => {
    try {
        const res = await axios.post(BOARD_API, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteBoard = createAsyncThunk('boardManagement/deleteBoard', async ({ accessToken, id }) => {
    try {
        await axios.delete(`${BOARD_API}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return id
    } catch (error) {
        console.log(error)
    }
})


export const boardManagementSlice = createSlice({
    name: 'boardManagement',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBoardData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getBoardData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getBoardData.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateBoard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data[state.data.findIndex(x => x.id == action.payload.id)] = action.payload
            })
            .addCase(updateBoard.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createBoard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
            .addCase(createBoard.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(deleteBoard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = state.data.filter(board => board.id != action.payload)
            })
            .addCase(deleteBoard.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectBoardData = state => state.boardManagement.data

export const selectBoardStatus = state => state.boardManagement.status

export const selectFirstBoardId = state => (state.boardManagement.data.length > 0 ? state.boardManagement.data[0].id : '')

export const selectBoardById = id => state => {
    const data = state.boardManagement.data.find(board => board.id == id)
    return data
}

export default boardManagementSlice.reducer