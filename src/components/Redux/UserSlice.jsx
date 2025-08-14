import { createSlice } from "@reduxjs/toolkit";

const initialState={
userData:null,
myCart:[],
myOrder:[],
isLoggedIn: false,
isauthChecked: false
};

const UserSlice=createSlice({
    name:'userID',
    initialState,
    reducers:{
        addUserData:(state,action)=>{
            state.userData=action.payload;
            state.isLoggedIn = true;
            state.isauthChecked = true;
        },

        logoutUser:(state)=>{
            state.userData = null;
            state.isLoggedIn = false;
            state.isauthChecked = false;
        },

        myCart:(state,action)=>{
            state.myCart=action.payload;
        },

        myOrder:(state,action)=>{
           state.myOrder=action.payload;
        }

        
    }
})

export const{addUserData,myCart,myOrder,logoutUser}=UserSlice.actions;
export default UserSlice.reducer;