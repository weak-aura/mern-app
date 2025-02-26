import {createSlice} from "@reduxjs/toolkit";
import {
  createPostAsyncThunk,
  deletePostAsyncThunk,
  getAllPostsAsyncThunk,
  getOnePostAsyncThunk
} from "../asyncActions/postAsyncThunk.ts";

export interface Author {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  author: Author,
  description: string,
  imageUrl: string,
  title: string,
  _id: string,
  createdAt: string
}

interface InitialStateTypes {
  length: number
  posts: Post[]
  onePost: Post | null
  message: string | null
  error: string | null
  status: string | null
  loading: string

  isPostIdSubmitted: boolean
}

const initialState: InitialStateTypes = {
  length: 0,
  posts: [],
  onePost: null,
  message: null,
  error: null,
  status: null,
  loading: "idle",

//   reducers
  isPostIdSubmitted: false
}


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setIsPostIdSubmitted: (state, action) => {
      state.isPostIdSubmitted = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE:
      .addCase(createPostAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(createPostAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        if (action.payload?.status === "created") {
          state.posts = [...state.posts, action.payload?.post];
        }
        state.error = action.payload?.error
        state.message = action.payload?.message
      })
      .addCase(createPostAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      //   GET ALL POSTS:
      .addCase(getAllPostsAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(getAllPostsAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.posts = action.payload?.posts
        state.status = action.payload?.status
        state.error = action.payload?.error
      })
      .addCase(getAllPostsAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      //   GET ONE POST:
      .addCase(getOnePostAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(getOnePostAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.onePost = action.payload?.post
      })
      .addCase(getOnePostAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

      // DELETE POST:
      .addCase(deletePostAsyncThunk.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(deletePostAsyncThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = action.payload?.error
        state.message = action.payload?.message

        const postIdToDelete = String(action.payload?.postId);
        if (action.payload?.status === "deleted") {
          state.posts = state.posts.filter(post => post._id !== postIdToDelete)
        }
      })
      .addCase(deletePostAsyncThunk.rejected, (state) => {
        state.loading = "rejected"
      })

  }
})

export const {setIsPostIdSubmitted} = postSlice.actions;
export default postSlice.reducer;
