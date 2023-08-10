import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  User } from '../models/user';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
    user: {
        email: '',
        token: '',
        username: '',
        bio: '',
        image: ''
    },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>){
      state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser  } = userSlice.actions

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
}

export default persistReducer(persistConfig,userSlice.reducer)