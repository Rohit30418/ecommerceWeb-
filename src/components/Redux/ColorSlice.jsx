import { createSlice } from "@reduxjs/toolkit";
const initialState={
    color:"#f2f0f1"
}



const ColorSlice=createSlice({
name:"color",
initialState,
reducers:{
    addColor:(state,action)=>{
        state.color=action.payload
    }
}
})



export const {addColor}=ColorSlice.actions;
export default ColorSlice.reducer;