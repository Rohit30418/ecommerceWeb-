import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import colorReducer from "./ColorSlice";
import TosteSlice from "./TosteSlice";
import AddTosteSlice from "./AddTosteSlice";
import DarkColorSlice, { DarkColor } from "./DarkColorSlice";
import LightColorSlice from "./AddLightColor"

const store = configureStore({
    reducer: {
        user: userReducer,
        color: colorReducer,
        toste:TosteSlice,
        addToste:AddTosteSlice,
        DarkColor:DarkColorSlice,
        LightColor:LightColorSlice,
    }
});

export default store;

