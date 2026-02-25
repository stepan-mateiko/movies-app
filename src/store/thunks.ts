import { createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, User } from '@/types';
import { addMovie, deleteMovie, fetchMovies, getUser, loginUser, updateMovie } from '@/services';

export const fetchMoviesThunk = createAsyncThunk<Movie[], void>(
	'movies/fetchMovies',
	async (_, { rejectWithValue }) => {
		try {
			return await fetchMovies();
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const addMovieThunk = createAsyncThunk<Movie, Partial<Movie>>(
	'movies/addMovie',
	async (movie, { rejectWithValue }) => {
		try {
			return await addMovie(movie);
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const updateMovieThunk = createAsyncThunk<Movie, Partial<Movie>>(
	'movies/updateMovie',
	async (movie, { rejectWithValue }) => {
		try {
			return await updateMovie(movie);
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const deleteMovieThunk = createAsyncThunk<number, number>(
	'movies/deleteMovie',
	async (id, { rejectWithValue }) => {
		try {
			await deleteMovie(id);
			return id;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const loginUserThunk = createAsyncThunk<User, { email: string; password: string }>(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const result = await loginUser(email, password);
			localStorage.setItem('token', result.token);
			return result;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const getUserThunk = createAsyncThunk<User, { token: string }>(
	'user/getUser',
	async ({ token }, { rejectWithValue }) => {
		try {
			return await getUser(token);
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const logoutUserThunk = createAsyncThunk<void, void>('user/logout', async (_, { rejectWithValue }) => {
	try {
		localStorage.removeItem('token');
	} catch (err: any) {
		return rejectWithValue(err.message);
	}
});
