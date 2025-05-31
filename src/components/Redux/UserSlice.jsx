import { createSlice } from "@reduxjs/toolkit";

const initialState={
userData:"",
myCart:[],
myOrder:[],
};

const UserSlice=createSlice({
    name:'userID',
    initialState,
    reducers:{
        addUserData:(state,action)=>{
            state.userData=action.payload;
        },

        myCart:(state,action)=>{
            state.myCart=action.payload;
        },

        myOrder:(state,action)=>{
           state.myOrder=action.payload;
        }

        
    }
})

export const{addUserData,myCart,myOrder}=UserSlice.actions;
export default UserSlice.reducer;