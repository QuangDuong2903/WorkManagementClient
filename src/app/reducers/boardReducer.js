import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { GET_USER_BOARD_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
};

export const getBoardData = createAsyncThunk('boardManagement/getBoardData', async (data) => {
    try {
        const res = await axios.post(GET_USER_BOARD_API, data)
        return res.data
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
            .addCase(getBoardData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectBoardData = state => state.boardManagement.data

export const selectBoardStatus = state => state.boardManagement.status

export default boardManagementSlice.reducer