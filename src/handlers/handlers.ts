import { Movie, MovieFormData, UserFormData } from '@/types';
import { TEXT } from '@/constants/text-constants';

export const isMovieDetailsPath = (pathname: string) => /^\/movies\/\d+$/.test(pathname);

export const filterAndSortMovies = (
	movies: Movie[],
	searchQuery: string | null,
	filter: string | null,
	sortBy: string | null
) => {
	let current = [...movies];

	if (searchQuery) {
		current = current.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
	}

	if (filter) {
		current = current.filter((m) => m.genres.includes(filter));
	}

	if (sortBy === 'title') {
		current.sort((a, b) => a.title.localeCompare(b.title));
	} else {
		current.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
	}

	return current;
};

export const getTotalPages = (totalItems: number, pageSize: number) =>
	Math.max(1, Math.ceil(totalItems / pageSize));

export const getPaginatedMovies = <T,>(items: T[], currentPage: number, pageSize: number) => {
	const startIndex = (currentPage - 1) * pageSize;
	return items.slice(startIndex, startIndex + pageSize);
};

export const getMovieReleaseYear = (releaseDate: string) => new Date(releaseDate).getFullYear();

export const formatMovieGenres = (genres: string[]) => genres.join(', ');

export const isMovieFormValid = (formData: MovieFormData) =>
	Boolean(
		formData.title &&
			formData.poster_path &&
			formData.genres.length &&
			formData.overview &&
			formData.release_date &&
			formData.vote_average &&
			formData.runtime
	);

export const buildUserFormErrors = (mode: 'login' | 'registration', formData: UserFormData) => {
	const newErrors: { [key: string]: string } = {};

	if (mode === 'registration' && !formData.name) newErrors.name = TEXT.USER_FORM.ERROR_NAME_REQUIRED;
	if (!formData.email) newErrors.email = TEXT.USER_FORM.ERROR_EMAIL_REQUIRED;
	if (!formData.password) newErrors.password = TEXT.USER_FORM.ERROR_PASSWORD_REQUIRED;

	return newErrors;
};
