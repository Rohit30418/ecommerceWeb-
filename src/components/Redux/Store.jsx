import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import colorReducer from "./ColorSlice";
import AddTosteSlice from "./AddTosteSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        color: colorReducer,
        addToste:AddTosteSlice,
    }
});

export default store;

