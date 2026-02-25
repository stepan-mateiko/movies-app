import { createSlice } from '@reduxjs/toolkit';
import { fetchMoviesThunk, deleteMovieThunk, addMovieThunk, updateMovieThunk } from './thunks';
import { MoviesState } from '@/types';

const initialState: MoviesState = {
	list: [],
	loading: false,
	error: null,
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetch
			.addCase(fetchMoviesThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMoviesThunk.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.list = payload;
			})
			.addCase(fetchMoviesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// add
			.addCase(addMovieThunk.fulfilled, (state, { payload }) => {
				state.list.push(payload);
			})
			.addCase(addMovieThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			// update
			.addCase(updateMovieThunk.fulfilled, (state, { payload }) => {
				const idx = state.list.findIndex((m) => m.id === payload.id);
				if (idx >= 0) state.list[idx] = payload;
			})
			.addCase(updateMovieThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			// delete
			.addCase(deleteMovieThunk.fulfilled, (state, { payload }) => {
				state.list = state.list.filter((m) => m.id !== payload);
			})
			.addCase(deleteMovieThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export default moviesSlice.reducer;
