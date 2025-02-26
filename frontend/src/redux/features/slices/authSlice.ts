import {createSlice} from "@reduxjs/toolkit";
import {
  getMeAsyncThunk,
  loginAsyncThunk, logoutAsyncThunk,
  registerAsyncThunk, resendCodeAsyncThunk,
  verificationAsyncThunk
} from "../asyncActions/authAsyncThunk.ts";

interface User {
  email: string
  _id: string
}

interface InitialStateTypes {
  error: string | undefined
  user: User | null
  loading: string
  message: string
  status: string
  
  pendingHook: string
}

const initialState: InitialStateTypes = {
  error: "",
  user: null,
  loading: "",
  message: "",
  status: "",
  
  pendingHook: "idle"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GETME:
      .addCase(getMeAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(getMeAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.message = action.payload?.message
        state.status = action.payload?.status
        state.error = action.payload?.error
        state.user = action.payload?.user
      })
      .addCase(getMeAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // LOGIN:
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload?.status
        state.message = action.payload?.message
        state.error = action.payload?.error
        state.user = action.payload?.user
      })
      .addCase(loginAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // LOGOUT:
      .addCase(logoutAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(logoutAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload?.status
        state.message = action.payload?.message
      })
      .addCase(logoutAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // REGISTER:
      .addCase(registerAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(registerAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload?.status
        state.message = action.payload?.message
        state.error = action.payload?.error
      })
      .addCase(registerAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // VERIFICATION:
      .addCase(verificationAsyncThunk.pending, (state) => {
        state.loading = "pending"
        state.pendingHook = "verification"
      })
      .addCase(verificationAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload?.status
        state.message = action.payload?.message
        state.error = action.payload?.error
      })
      .addCase(verificationAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      //   RESENDCODE:
      .addCase(resendCodeAsyncThunk.pending, (state) => {
        state.loading = "pending"
        state.pendingHook = "resendCode"
      })
      .addCase(resendCodeAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload?.status
        state.message = action.payload?.message
        state.error = action.payload?.error
      })
      .addCase(resendCodeAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })
  }
})

export default authSlice.reducer;