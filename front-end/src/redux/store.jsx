import { configureStore } from '@reduxjs/toolkit'
import ConversationSlice from './slices/ConversationSlice'
import UserSlice from './slices/UserSlice'

export const store = configureStore({
    reducer: {
        user: UserSlice,
        conversation: ConversationSlice
    },
})