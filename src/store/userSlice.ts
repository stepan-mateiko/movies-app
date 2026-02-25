import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, logoutUserThunk, getUserThunk } from './thunks';
import { User } from '@/types';

const initialState: User = {
	name: '',
	email: '',
	role: 'user',
	token: '',
	isAuth: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
				state.name = payload.name;
				state.email = payload.email;
				state.role = payload.role;
				state.token = payload.token;
				state.isAuth = true;
				state.error = null;
			})
			.addCase(loginUserThunk.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isAuth = false;
			})

			.addCase(getUserThunk.fulfilled, (state, { payload }) => {
				state.name = payload.name;
				state.email = payload.email;
				state.role = payload.role;
				state.token = payload.token;
				state.isAuth = true;
				state.error = null;
			})
			.addCase(getUserThunk.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isAuth = false;
			})

			.addCase(logoutUserThunk.fulfilled, (state) => {
				state.name = '';
				state.email = '';
				state.role = 'user';
				state.token = '';
				state.isAuth = false;
			});
	},
});

export default userSlice.reducer;
