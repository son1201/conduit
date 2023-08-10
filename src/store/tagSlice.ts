import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TagState {
  currentTag: string
}

const initialState: TagState = {
  currentTag: ''
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<string>) => {
      state.currentTag = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTag } = tagSlice.actions

export default tagSlice.reducer