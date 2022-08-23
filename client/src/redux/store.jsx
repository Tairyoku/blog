import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import commentSlice from './features/comments/commentSlice'
import postSlice from './features/post/postSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice
    },
})