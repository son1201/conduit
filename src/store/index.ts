import {  configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../store/userSlice'
import tagReducer from '../store/tagSlice'
import commentsReducer from '../store/commentSlice'
import {persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: {
    userReducer,
    tagReducer,
    commentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch