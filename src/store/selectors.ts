import { RootState } from './index';

export const selectMovies = (state: RootState) => state.movies.list;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;

export const selectUser = (state: RootState) => state.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserRole = (state: RootState) => state.user.role;
