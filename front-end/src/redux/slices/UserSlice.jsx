import { URL } from '~/utils/constant';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { default: axios } = require('axios');

export const SignInUser = createAsyncThunk('user/signin', async ({ user }, thunkAPI) => {
    try {
        const { data } = await axios.post(`${URL}/api/auth/login`, user);

        localStorage.setItem("accessToken", JSON.stringify(data.data.accessToken))
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            status: 401,
            message: 'Tài khoản hoặc mật khẩu không đúng',
        });
    }
});

export const SignUpUser = createAsyncThunk('user/signup', async (user, thunkAPI) => {
    try {
        const { data } = await axios.post(`${URL}/api/user/create`, user);
        localStorage.setItem("accessToken", JSON.stringify(data.data.accessToken))
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
    user: {
        userId: '',
        accessToken: ''
    },
    message: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SignInUser.fulfilled, (state, { payload }) => {
            state.user = payload.data;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Đăng nhập thành công';
        });
        builder.addCase(SignInUser.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(SignInUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        });
        builder.addCase(SignUpUser.fulfilled, (state, { payload }) => {
            state.user = payload.data;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Đăng ký thành công';
        });
        builder.addCase(SignUpUser.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(SignUpUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        });
    },
});

export default UserSlice.reducer;
export const { logout } = UserSlice.actions;
