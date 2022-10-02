import { URL } from '~/utils/constant';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { default: axios } = require('axios');

export const getConversationAllByToken = createAsyncThunk('conversation/getAll', async (accessToken, thunkAPI) => {
    try {
        const { data } = await axios.get(`${URL}/api/conversation/all-of-user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        return data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({
            status: 401,
            message: 'Đăng ký thất bại',
        });
    }
});

const initialState = {
    conversations: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const ConversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        updateSortConversations: (state, { payload }) => {
            const newConversation = state.conversations.find(x => x.id === payload)

            const conversations = state.conversations.filter(x => x.id != payload)

            state.conversations = [newConversation].concat(conversations)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getConversationAllByToken.fulfilled, (state, { payload }) => {
            state.conversations = payload.data;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Đăng nhập thành công';
        });
        builder.addCase(getConversationAllByToken.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(getConversationAllByToken.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        });
    },
});

export default ConversationSlice.reducer;
export const { updateSortConversations } = ConversationSlice.actions