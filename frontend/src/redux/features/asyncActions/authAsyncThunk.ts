import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_DOMAIN_SERVER_URL

interface UserDataTypes {
  email?: string | undefined
  username?: string | undefined
  password?: string | undefined
  verifyCode?: string | undefined
}

export const registerAsyncThunk = createAsyncThunk("/registerAsyncThunk", async (payload: UserDataTypes) => {
  try {
    return await fetch(`${API_URL}/api/auth/register`, {
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

export const verificationAsyncThunk = createAsyncThunk("/verificationAsynkThunk", async (payload: UserDataTypes) => {
  try {
    return await fetch(`${API_URL}/api/auth/verification`, {
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
      return await fetch(`${API_URL}/api/auth/resendCode`, {
        method: "POST",
        credentials: "include"
      })
        .then((response) => response.json())
    } catch (error) {
      console.log("Error in resendCodeAsyncThunk:", error)
    }
  })

export const loginAsyncThunk = createAsyncThunk("/loginAsyncThunk", async (payload: UserDataTypes) => {
  try {
    return await fetch(`${API_URL}/api/auth/login`, {
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
    return await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
      .then(response => response.json());
  } catch (error) {
    console.log("error in logoutAsyncthunk:", error)
  }
})

export const getMeAsyncThunk = createAsyncThunk("/getMeAsyncThunk", async () => {
  return await fetch(`${API_URL}/api/auth/getme`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include"
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => console.log(error))
})