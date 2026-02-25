import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MoviesList, Header } from './components';
import { PrivateRoute } from '@/common';
import { MovieForm, UserForm } from '@/components/forms';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMoviesThunk, getUserThunk } from './store/thunks';
import { ROUTE_PATHS, USER_FORM_MODES, USER_ROLE } from '@/constants/constants';
import { Footer } from './components/Footer/Footer';

function App() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	const token = localStorage.getItem('token');
	const { role } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (token) {
			dispatch(getUserThunk({ token }));
		}
		dispatch(fetchMoviesThunk());
	}, [dispatch, token]);

	if (!token) {
		return (
			<>
				<Header />
				<Routes>
					<Route path={ROUTE_PATHS.LOGIN} element={<UserForm mode={USER_FORM_MODES.LOGIN} />} />
					<Route path={ROUTE_PATHS.REGISTRATION} element={<UserForm mode={USER_FORM_MODES.REGISTRATION} />} />
					<Route path='*' element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
				</Routes>
				<Footer />
			</>
		);
	}

	return (
		<div>
			<Header />

			<Routes location={state?.backgroundLocation || location}>
				<Route path={ROUTE_PATHS.HOME} element={<MoviesList />} />
				<Route path={ROUTE_PATHS.MOVIES} element={<MoviesList />} />
				<Route path={`${ROUTE_PATHS.MOVIES}/:movieId`} element={<MoviesList />} />

				<Route path={ROUTE_PATHS.LOGIN} element={<UserForm mode={USER_FORM_MODES.LOGIN} />} />
				<Route path={ROUTE_PATHS.REGISTRATION} element={<UserForm mode={USER_FORM_MODES.REGISTRATION} />} />

				{role === USER_ROLE.ADMIN && (
					<>
						<Route
							path={ROUTE_PATHS.ADD_MOVIE}
							element={
								<PrivateRoute>
									<MoviesList />
									<MovieForm />
								</PrivateRoute>
							}
						/>
						<Route
							path={ROUTE_PATHS.EDIT_MOVIE}
							element={
								<PrivateRoute>
									<>
										<MoviesList />
										<MovieForm />
									</>
								</PrivateRoute>
							}
						/>
					</>
				)}

				<Route path='*' element={<Navigate to={ROUTE_PATHS.MOVIES} replace />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
