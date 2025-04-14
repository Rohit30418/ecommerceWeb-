import { createSlice } from "@reduxjs/toolkit";

const initialState={
userid:"",
myCart:[],
};

const UserSlice=createSlice({
    name:'userID',
    initialState,
    reducers:{
        addUserId:(state,action)=>{
            state.userid=action.payload;
        },

        myCart:(state,action)=>{
            state.myCart=action.payload;
        }

        
    }
})

export const{addUserId,myCart}=UserSlice.actions;
export default UserSlice.reducer;