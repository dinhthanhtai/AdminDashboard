import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const themeSlice = createSlice({
    name: 'theme',
    initialState, 
    reducers: {
        setMode: (state, action) => {
            return {...state, mode: action.payload }
        },
        setColor: (state, action) => {
            return {...state,  color: action.payload}
        }
    }
});

export const { setMode, setColor } = themeSlice.actions;

export default themeSlice.reducer;