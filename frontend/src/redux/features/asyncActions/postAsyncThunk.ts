import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_PRODUCTION_MODE

export const createPostAsyncThunk = createAsyncThunk("createPostAsyncThunk",
  async (payload: FormData) => {
    try {
      return await fetch(`${API_URL}/api/post/create`, {
        method: "POST",
        body: payload,
        credentials: "include"
      })
        .then((response) => response.json())
    } catch (error) {
      console.log("error createPostAsyncThunk:", error)
    }
  })

export const getAllPostsAsyncThunk = createAsyncThunk("getAllPostsAsyncThunk",
  async () => {
    try {
      const data = await fetch(`${API_URL}/api/post/getAllPosts`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      })
        .then((response) => response.json())

      return data

    } catch (error) {
      console.error("Error in getAllPostsAsyncThunk:", error);
      throw error;
    }
  });

export const getOnePostAsyncThunk = createAsyncThunk("getOnePostAsyncThunk", 
  async (payload: string | undefined) => {
    try {
      const response = await fetch(`${API_URL}/api/post/getOnePost/${payload}`, {
        method: "GET",
        credentials: "include"
      })
      
      return response.json();
    }catch (error) {
      console.log("error on getOnePostAsyncThunk:", error)
      throw error
    }
  }) 

export const deletePostAsyncThunk = createAsyncThunk("deletePostAsyncThunk",
  async (payload: string) => {
    try {
      const data = await fetch(`${API_URL}/api/post/deletePost/${payload}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json());

      return {...data, postId: payload}

    } catch (error) {
      console.error("Error in deletePostAsyncThunk:", error);
      throw error;
    }
  });