import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  navIndex: 0
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveIndex: (state, action) => {
      state.navIndex = action.payload;
    }
  }
})

export const {setActiveIndex} = navigationSlice.actions;
export default navigationSlice.reducer;