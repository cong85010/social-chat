const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const { URL } = require("~/utils/color");

export const SignInUser = createAsyncThunk("user/signin", async ({ user }, thunkAPI) => {
    try {
        const data = await axios.post(`${URL}/api/auth/signin`, user)

        return data
    } catch (error) {
        return thunkAPI.rejectWithValue({
            status: 401,
            message: "Tài khoản hoặc mật khẩu không đúng"
        })
    }
})

export const SignUpUser = createAsyncThunk("user/signup", async ({ user }, thunkAPI) => {

    const data = await axios.post(`${URL}}/api/auth/signup`, user)

    if (data.status === 200) {
        return data
    }
    return thunkAPI.rejectWithValue(data)
})

const initialState = {
    user: {},
    message: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SignInUser.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(SignInUser.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        builder.addCase(SignInUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        })
        builder.addCase(SignUpUser.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(SignUpUser.pending, (state, { payload }) => {
            state.user = payload.user;
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        builder.addCase(SignUpUser.rejected, (state, { payload }) => {
            state.user = payload.user;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = payload.message;
        })
    }
})

export default UserSlice.reducer
