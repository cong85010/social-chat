import { getHeaders, URL } from '~/utils/constant';
import { getToken } from '~/utils/function';

const { createSlice, createAsyncThunk, current } = require('@reduxjs/toolkit');
const { default: axios } = require('axios');

export const getChatByConversationID = createAsyncThunk('chat/getChat', async (ConversationID, thunkAPI) => {
    try {
        const { data } = await axios.post(`${URL}/api/message/get-message-of-conversation`, {
            conversationId: ConversationID,
            pageNumber: 0,
            pageSize: 20
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                Accept: 'application/json',
            },
        });

        const contentReverse = data.data.content.reverse()
        data.data.content = contentReverse
        return data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({
            status: 401,
            message: 'Thất bại',
        });
    }
});

const initialState = {
    chat: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const groupBy = function (xs) {
    const data = xs.reduce(function (rv, x) {
        (rv[x] = rv[x] || []).push(x);
        return rv;
    }, {});

    return Object.entries(data).map(x => { return { type: x[0], counter: x[1].length } }).filter(x => x.counter !== 0)
};

const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateContentChat: (state, action) => {
            const list = current(state)
            const chatIndex = list.chat.content.findIndex(c => c.id === action.payload.id)
            if (chatIndex !== -1) {
                state.chat.content[chatIndex] = { ...action.payload, reactList: groupBy(action.payload.reactList) }

            } else {
                state.chat.content = [...state.chat.content, action.payload];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChatByConversationID.fulfilled, (state, { payload }) => {
            state.chat = payload.data;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Đăng nhập thành công';
        });
        builder.addCase(getChatByConversationID.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(getChatByConversationID.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        });
    },
});

export default ChatSlice.reducer;
export const { updateContentChat } = ChatSlice.actions