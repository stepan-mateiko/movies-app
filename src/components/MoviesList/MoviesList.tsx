import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMoviesThunk, deleteMovieThunk } from '@/store/thunks';
import { selectMovies } from '@/store/selectors';
import { useSearchParams, useParams } from 'react-router-dom';
import { Panel } from './Panel/Panel';
import { MovieTile } from './MovieTile/MovieTile';
import { Modal, Button, Loader, Error } from '@/common';
import { MovieDetails } from '../MovieDetails/MovieDetails';
import styles from './styles.module.scss';
import { Movie } from '@/types';
import { TEXT } from '@/constants/text-constants';
import { filterAndSortMovies, getPaginatedMovies, getTotalPages } from '@/handlers/handlers';

export const MoviesList: React.FC = () => {
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovies);
	const PAGE_SIZE = 12;

	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');

	const { movieId } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
	const [deleteMovieId, setDeleteMovieId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError(null);
			try {
				await dispatch(fetchMoviesThunk()).unwrap();
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [dispatch]);

	useEffect(() => {
		const filter = searchParams.get('filter');
		const sortBy = searchParams.get('sortBy');
		setFilteredMovies(filterAndSortMovies(movies, searchQuery, filter, sortBy));
		setCurrentPage(1);
	}, [movies, searchParams, searchQuery]);

	useEffect(() => {
		const totalPages = getTotalPages(filteredMovies.length, PAGE_SIZE);
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [filteredMovies.length, currentPage, PAGE_SIZE]);

	const handleDeleteConfirm = async () => {
		if (deleteMovieId != null) {
			await dispatch(deleteMovieThunk(deleteMovieId));
			setDeleteMovieId(null);
		}
	};

	if (loading) return <Loader message={TEXT.MOVIES_LIST.LOADING} />;
	if (error) return <Error message={error} />;

	const totalPages = getTotalPages(filteredMovies.length, PAGE_SIZE);
	const paginatedMovies = getPaginatedMovies(filteredMovies, currentPage, PAGE_SIZE);

	return (
		<div className={styles.moviesListWrapper}>
			{movieId && <MovieDetails />}

			<Panel movies={filteredMovies} />
			<p>
				<b>{filteredMovies.length} </b>
				{filteredMovies.length === 1 ? TEXT.MOVIES_LIST.MOVIE_FOUND_SINGULAR : TEXT.MOVIES_LIST.MOVIE_FOUND_PLURAL}
			</p>

			<ul className={styles.list}>
				{paginatedMovies.map((movie) => (
					<MovieTile key={movie.id} {...movie} onDelete={() => setDeleteMovieId(movie.id)} />
				))}
			</ul>

			{filteredMovies.length > PAGE_SIZE && (
				<div className={styles.pagination}>
					<Button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
						{TEXT.MOVIES_LIST.PREV}
					</Button>
					<p className={styles.paginationInfo}>{TEXT.MOVIES_LIST.PAGE_INFO(currentPage, totalPages)}</p>
					<Button
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						disabled={currentPage === totalPages}
					>
						{TEXT.MOVIES_LIST.NEXT}
					</Button>
				</div>
			)}

			{deleteMovieId && (
				<Modal onClose={() => setDeleteMovieId(null)}>
					<h2>{TEXT.MOVIES_LIST.DELETE_TITLE}</h2>
					<p>{TEXT.MOVIES_LIST.DELETE_CONFIRM}</p>
					<div className={styles.modalButtons}>
						<Button onClick={handleDeleteConfirm} variant='danger'>
							{TEXT.MOVIES_LIST.CONFIRM}
						</Button>
						<Button onClick={() => setDeleteMovieId(null)}>{TEXT.MOVIES_LIST.CANCEL}</Button>
					</div>
				</Modal>
			)}
		</div>
	);
};
