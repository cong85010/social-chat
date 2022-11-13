import { URL } from '~/utils/constant';
import { getToken } from '~/utils/function';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { default: axios } = require('axios');

const initialState = {
    userChat: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const UserChatSlice = createSlice({
    name: 'userChat',
    initialState,
    reducers: {
        saveUserChat: (state, action) => {
            state.userChat = action.payload.userChat
        },
        updateUserChat: (state, action) => {
            state.userChat = action.payload
        }
    },
});

export default UserChatSlice.reducer;
export const { saveUserChat, updateUserChat } = UserChatSlice.actions