import {
	buildUserFormErrors,
	filterAndSortMovies,
	formatMovieGenres,
	getMovieReleaseYear,
	getPaginatedMovies,
	getTotalPages,
	isMovieDetailsPath,
	isMovieFormValid,
} from './handlers';

describe('handlers', () => {
	const movies = [
		{
			id: 1,
			title: 'Zeta',
			vote_average: 7.1,
			release_date: '2022-01-10',
			poster_path: '/zeta.jpg',
			overview: 'zeta overview',
			genres: ['Action'],
			runtime: 120,
		},
		{
			id: 2,
			title: 'Alpha',
			vote_average: 8.4,
			release_date: '2024-03-20',
			poster_path: '/alpha.jpg',
			overview: 'alpha overview',
			genres: ['Drama'],
			runtime: 100,
		},
	];

	it('validates movie details route path', () => {
		expect(isMovieDetailsPath('/movies/123')).toBe(true);
		expect(isMovieDetailsPath('/movies/add')).toBe(false);
	});

	it('filters and sorts movies by title', () => {
		const result = filterAndSortMovies(movies, 'a', null, 'title');
		expect(result.map((m) => m.title)).toEqual(['Alpha', 'Zeta']);
	});

	it('filters by genre and sorts by release date desc by default', () => {
		const result = filterAndSortMovies(movies, null, 'Action', null);
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Zeta');
	});

	it('calculates pagination helpers', () => {
		expect(getTotalPages(0, 12)).toBe(1);
		expect(getTotalPages(25, 12)).toBe(3);
		expect(getPaginatedMovies([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
	});

	it('formats movie fields', () => {
		expect(getMovieReleaseYear('2024-03-20')).toBe(2024);
		expect(formatMovieGenres(['Action', 'Drama'])).toBe('Action, Drama');
	});

	it('validates movie form data', () => {
		expect(
			isMovieFormValid({
				title: 'Movie',
				poster_path: '/poster.jpg',
				genres: ['Action'],
				overview: 'overview',
				release_date: '2023-10-10',
				vote_average: 8,
				runtime: 120,
			})
		).toBe(true);

		expect(
			isMovieFormValid({
				title: 'Movie',
				poster_path: '/poster.jpg',
				genres: [],
				overview: 'overview',
				release_date: '2023-10-10',
				vote_average: 8,
				runtime: 120,
			})
		).toBe(false);
	});

	it('builds user form errors by mode', () => {
		expect(buildUserFormErrors('registration', { name: '', email: '', password: '' })).toEqual({
			name: 'Name is required',
			email: 'Email is required',
			password: 'Password is required',
		});

		expect(buildUserFormErrors('login', { email: '', password: '' })).toEqual({
			email: 'Email is required',
			password: 'Password is required',
		});
	});
});
