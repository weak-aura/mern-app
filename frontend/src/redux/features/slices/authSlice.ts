  import {createSlice} from "@reduxjs/toolkit";
import {
  getMeAsyncThunk,
  loginAsyncThunk, logoutAsyncThunk, recoverPasswordEmailVerificationAsyncThunk, recoverPasswordAsyncThunk,
  registerAsyncThunk, resendCodeAsyncThunk,
  verificationAsyncThunk, recoverPasswordResendCodeAsyncThunk, recoverPasswordResetAsyncThunk
} from "../asyncActions/authAsyncThunk.ts";

interface User {
  email: string
  _id: string
}

interface InitialStateTypes {
  error: string | null
  user: User | null
  loading: string
  message: string | null
  status: string | null
  cookie: string | null
  cookie_code: string | null
  hook_pending: string
}

const initialState: InitialStateTypes = {
  error: null,
  user: null,
  loading: "idle",
  message: null,
  status: null,
  cookie: null,
  cookie_code: null,
  hook_pending: "idle"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ME:
      .addCase(getMeAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(getMeAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.message = action.payload.message
        state.status = action.payload.status
        state.error = action.payload.error
        state.user = action.payload.user
        state.cookie = action.payload.cookie
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
        state.status = action.payload.status
        state.message = action.payload.message
        state.error = action.payload.error
        state.user = action.payload.user
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
        state.status = action.payload.status
        state.message = action.payload.message
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
        state.status = action.payload.status
        state.message = action.payload.message
        state.error = action.payload.error
      })
      .addCase(registerAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // VERIFICATION:
      .addCase(verificationAsyncThunk.pending, (state) => {
        state.loading = "pending"
        state.hook_pending = "verification"
      })
      .addCase(verificationAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload.status
        state.message = action.payload.message
        state.error = action.payload.error
      })
      .addCase(verificationAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      //   RESEND CODE:
      .addCase(resendCodeAsyncThunk.pending, (state) => {
        state.loading = "pending"
        state.hook_pending = "resendCode"
      })
      .addCase(resendCodeAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.status = action.payload.status
        state.message = action.payload.message
        state.error = action.payload.error
      })
      .addCase(resendCodeAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      //   RECOVER PASSWORD:
      .addCase(recoverPasswordAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(recoverPasswordAsyncThunk.fulfilled, (state,action) => {
        state.loading = "fulfilled"
        state.message = action.payload.message
        state.error = action.payload.error
        state.status = action.payload.status
      })
      .addCase(recoverPasswordAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // RECOVER PASSWORD EMAIL VERIFICATION
      .addCase(recoverPasswordEmailVerificationAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(recoverPasswordEmailVerificationAsyncThunk.fulfilled, (state,action) => {
        state.loading = "fulfilled"
        state.message = action.payload.message
        state.error = action.payload.error
        state.status = action.payload.status
        state.cookie_code = action.payload.cookie_code
      })
      .addCase(recoverPasswordEmailVerificationAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })
      
      // RECOVER PASSWORD RESEND CODE
      .addCase(recoverPasswordResendCodeAsyncThunk.pending, (state) => {
        state.loading = "pending"
        state.hook_pending = "resend_code"
      })
      .addCase(recoverPasswordResendCodeAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.message = action.payload.message
        state.error = action.payload.error
        state.cookie_code = action.payload.cookie_code
      })
      .addCase(recoverPasswordResendCodeAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })
      
      // PASSWORD RESET
      .addCase(recoverPasswordResetAsyncThunk.pending, (state) =>{
        state.loading = "pending"
      })
      .addCase(recoverPasswordResetAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.message = action.payload.message
        state.error = action.payload.error
        state.status = action.payload.status
      })
      .addCase(recoverPasswordResetAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })
    
  }
})

export default authSlice.reducer;