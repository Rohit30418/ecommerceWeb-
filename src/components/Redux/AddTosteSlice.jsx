import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const AddTosteSlice = createSlice({
    name: "addSlice",
    initialState,
    reducers: {
        AddToste: (state, action) => {
            state.push({
                ...action.payload,
                timestamp: Date.now(),
            });
        },
        removeToste: (state, action) => {
            console.log(action.payload);
           return  state.filter((toste) => toste.id !== action.payload);
           
             
        },
    },
});

export const { AddToste, removeToste } = AddTosteSlice.actions;
export default AddTosteSlice.reducer;
