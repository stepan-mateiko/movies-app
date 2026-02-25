import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import styles from './styles.module.scss';
import { TEXT } from '@/constants/text-constants';
import { formatMovieGenres, getMovieReleaseYear } from '@/handlers/handlers';

export const MovieDetails: React.FC = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const movies = useAppSelector((state) => state.movies.list);

	const movie = movies.find((m) => m.id === Number(movieId));

	if (!movie) {
		return <div className={styles.notFound}>{TEXT.MOVIE_DETAILS.NOT_FOUND}</div>;
	}

	const releaseYear = getMovieReleaseYear(movie.release_date);
	const genres = formatMovieGenres(movie.genres);
	const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
	const minutes = movie.runtime ? movie.runtime % 60 : 0;
	const duration = movie.runtime ? `${hours}h ${minutes}min` : TEXT.MOVIE_DETAILS.NA;
	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : TEXT.MOVIE_DETAILS.NA;

	return (
		<div className={styles.movieDetails}>
			<div className={styles.posterWrapper}>
				<img src={movie.poster_path} alt={movie.title} className={styles.poster} />
			</div>
			<div className={styles.detailsWrapper}>
				<div className={styles.titleRow}>
					<h1 className={styles.title}>{movie.title}</h1>
					<span className={styles.rating}>{rating}</span>
				</div>
				<p className={styles.genre}>{genres}</p>
				<div className={styles.meta}>
					<span className={styles.releaseYear}>{releaseYear}</span>
					<span className={styles.duration}>{duration}</span>
				</div>
				<p className={styles.description}>{movie.overview}</p>
			</div>
		</div>
	);
};
