import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LightColor: "#d7dbb4"
};

const LightColorSlice = createSlice({
  name: "LightColor",
  initialState,
  reducers: {
    addLightColor: (state, action) => {
      state.LightColor = action.payload; // Correctly updating the current state
    }
  }
});

export const { addLightColor } = LightColorSlice.actions;
export default LightColorSlice.reducer;
