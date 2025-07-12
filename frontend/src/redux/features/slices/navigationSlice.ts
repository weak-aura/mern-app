import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentNavigatorIndex: 0,
  currentPathname: "",
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentNavigatorIndex: (state, action) => {
      if (action.payload < 0) {
        state.currentNavigatorIndex = 3
      } else {
        state.currentNavigatorIndex = action.payload
      }
    },
    setCurrentPathname: (state, action) => {
      state.currentPathname = action.payload;
    },
  }
})

export const {setCurrentNavigatorIndex, setCurrentPathname} = navigationSlice.actions;
export default navigationSlice.reducer;