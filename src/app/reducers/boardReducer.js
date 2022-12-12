import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BOARD_API } from "../../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
};

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

export const selectBoardById = id => state => {
    const data = state.boardManagement.data.find(board => board.id == id)
    return data
}

export default boardManagementSlice.reducer