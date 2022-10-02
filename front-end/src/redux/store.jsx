import { configureStore } from '@reduxjs/toolkit'
import ChatSlice from './slices/ChatSlice'
import ConversationSlice from './slices/ConversationSlice'
import UserSlice from './slices/UserSlice'
import UserChatSlice from './slices/UserChatSlice';

export const store = configureStore({
    reducer: {
        user: UserSlice,
        conversation: ConversationSlice,
        chat: ChatSlice,
        userChat: UserChatSlice
    },
})