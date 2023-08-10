import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '../models/comment'

export interface CommentState {
  comments: Comment[]
}

const initialState: CommentState = {
    comments: [],
}

export const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state: CommentState, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setComments } = CommentSlice.actions

export default CommentSlice.reducer