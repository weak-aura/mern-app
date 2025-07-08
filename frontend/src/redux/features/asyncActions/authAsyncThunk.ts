import {createAsyncThunk} from "@reduxjs/toolkit";

const SERVER_URL = import.meta.env.VITE_MODE_PRODUCTION || import.meta.env.VITE_MODE_DEVELOPMENT
// const SERVER_URL = import.meta.env.VITE_MODE_DEVELOPMENT

interface UserDataTypes {
  email?: string | undefined
  username?: string | undefined
  password?: string | undefined
  verifyCode?: string | undefined
}

export const registerAsyncThunk = createAsyncThunk("/registerAsyncThunk",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      })
        .then((response) => response.json())
    } catch (error) {
      console.log("Error in registerAsyncThunk:", error)
    }
  })

export const verificationAsyncThunk = createAsyncThunk("/verificationAsyncThunk",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/verification`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      })
        .then((response) => response.json());
    } catch (error) {
      console.log("Error in verificationAsyncThunk:", error)
    }
  })

export const resendCodeAsyncThunk = createAsyncThunk("resendCodeAsyncThunk",
  async () => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/resendCode`, {
        method: "POST",
        credentials: "include"
      })
        .then((response) => response.json())
    } catch (error) {
      console.log("Error in resendCodeAsyncThunk:", error)
    }
  })

export const loginAsyncThunk = createAsyncThunk("/loginAsyncThunk",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      })
        .then((response) => response.json());
    } catch (error) {
      console.log("Error in loginAsyncThunk:", error)
    }
  })

export const logoutAsyncThunk = createAsyncThunk("/logoutAsyncThunk", async () => {
  try {
    return await fetch(`${SERVER_URL}/api/auth/logout`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
      .then(response => response.json());
  } catch (error) {
    console.log("error in logoutAsyncthunk:", error)
  }
})

export const getMeAsyncThunk = createAsyncThunk("/getMeAsyncThunk",
  async () => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/getMe`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then((response) => response.json())
    } catch (error) {
      console.log("error in getMeAsyncThunk:", error)
    }
  })

export const recoverPasswordAsyncThunk = createAsyncThunk("recoverPassword",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/recover_password`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then((response) => response.json());


    } catch (error) {
      console.log("error in recoverPassword:", error)
    }
  })

export const recoverPasswordEmailVerificationAsyncThunk = createAsyncThunk("recoverPasswordEmailVerificationAsyncThunk",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/recover_password/email_verification`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then((response) => response.json());
    } catch (error) {
      console.log("error in recoverPasswordEmailVerificationAsyncThunk:", error)
    }
  })

export const recoverPasswordResendCodeAsyncThunk = createAsyncThunk("recoverPasswordResendCodeAsyncThunk",
  async () => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/recover_password/resend_code`, {
        method: "POST",
        credentials: "include"
      }).then((response) => response.json())
    } catch (error) {
      console.log("erorr in recoverPasswordResendCodeAsyncThunk:", error)
    }
  })

export const recoverPasswordResetAsyncThunk = createAsyncThunk("recoverPasswordResetAsyncThunk",
  async (payload: UserDataTypes) => {
    try {
      return await fetch(`${SERVER_URL}/api/auth/recover_password/reset`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then(response => response.json())
    } catch (error) {
      console.log("error in recoverPasswordResetAsyncThunk:", error)
    }
  })





