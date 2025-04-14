import { createSlice } from "@reduxjs/toolkit";

const initialState={
    DarkColor:"#2d2e33"
}


const DarkColorSlice=createSlice({
    name:"DarkColor",
    initialState,
    reducers:{
        DarkColor:(state,action)=>{
           state.DarkColor=action.payload;
        }
    }

})

export const {DarkColor}=DarkColorSlice.actions;
export default DarkColorSlice.reducer;