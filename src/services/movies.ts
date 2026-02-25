import { Movie } from '@/types';
import { BASE_URL, assertOk, parseJson } from './api';

export const fetchMovies = async () => {
	const res = await fetch(`${BASE_URL}/movies?limit=3000`);
	assertOk(res, 'Failed to fetch movies');
	const result = await parseJson<{ data: Movie[] }>(res);
	return result.data;
};

export const addMovie = async (movie: Partial<Movie>) => {
	const res = await fetch(`${BASE_URL}/movies`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(movie),
	});
	assertOk(res, 'Failed to add movie');
	return await parseJson<Movie>(res);
};

export const updateMovie = async (movie: Partial<Movie>) => {
	const res = await fetch(`${BASE_URL}/movies/${movie.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(movie),
	});
	assertOk(res, 'Failed to update movie');
	return await parseJson<Movie>(res);
};

export const deleteMovie = async (id: number) => {
	const res = await fetch(`${BASE_URL}/movies/${id}`, {
		method: 'DELETE',
	});
	assertOk(res, 'Failed to delete movie');
};
