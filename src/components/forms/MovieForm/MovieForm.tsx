import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Modal } from '@/common';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addMovieThunk, updateMovieThunk, fetchMoviesThunk } from '@/store/thunks';
import { ROUTE_PATHS } from '@/constants/constants';
import { MovieFormData } from '@/types';
import { TEXT } from '@/constants/text-constants';
import { isMovieFormValid } from '@/handlers/handlers';
import styles from './styles.module.scss';

const genresList = TEXT.MOVIE_FORM.GENRES;

export const MovieForm: React.FC = () => {
	const { movieId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const movieToEdit = useAppSelector((state) => state.movies.list.find((m) => m.id === Number(movieId)));

	const [formData, setFormData] = useState<MovieFormData>({
		title: '',
		poster_path: '',
		genres: [],
		overview: '',
		release_date: '',
		vote_average: 0,
		runtime: 0,
	});

	const [isNotification, setIsNotification] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (movieId && movieToEdit) {
			setFormData({
				...movieToEdit,
				vote_average: movieToEdit.vote_average || 0,
				runtime: movieToEdit.runtime || 0,
			});
		}
	}, [movieId, movieToEdit]);

	const handleChange = (field: keyof MovieFormData, value: string | number) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleGenreChange = (genre: string) => {
		setFormData((prev) => ({
			...prev,
			genres: genre ? [genre] : [],
		}));
	};

	const handleReset = () => {
		if (movieId && movieToEdit) {
			setFormData({
				...movieToEdit,
				vote_average: movieToEdit.vote_average || 0,
				runtime: movieToEdit.runtime || 0,
			});
		} else {
			setFormData({
				title: '',
				poster_path: '',
				genres: [],
				overview: '',
				release_date: '',
				vote_average: 0,
				runtime: 0,
			});
		}
		setError('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isMovieFormValid(formData)) {
			setError(TEXT.MOVIE_FORM.ERROR_REQUIRED);
			return;
		}

		try {
			if (movieId) {
				await dispatch(updateMovieThunk({ ...formData, id: Number(movieId) })).unwrap();
			} else {
				await dispatch(addMovieThunk(formData)).unwrap();
			}

			dispatch(fetchMoviesThunk());
			setIsNotification(true);
		} catch {
			setError(TEXT.MOVIE_FORM.ERROR_GENERIC);
		}
	};

	const handleCloseNotification = () => {
		setIsNotification(false);
		navigate(ROUTE_PATHS.MOVIES);
	};

	return (
		<Modal onClose={() => navigate(ROUTE_PATHS.MOVIES)}>
			{isNotification ? (
				<div className={styles.notification}>
					<h2>{TEXT.MOVIE_FORM.CONGRATS}</h2>
					<p>{movieId ? TEXT.MOVIE_FORM.UPDATED_SUCCESS : TEXT.MOVIE_FORM.ADDED_SUCCESS}</p>
					<Button onClick={handleCloseNotification}>{TEXT.MOVIE_FORM.CLOSE}</Button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className={styles.container}>
					<h2>{movieId ? TEXT.MOVIE_FORM.TITLE_EDIT : TEXT.MOVIE_FORM.TITLE_ADD}</h2>

					{error && <p className={styles.error}>{error}</p>}

					<div className={styles.field}>
						<Input
							labelText={TEXT.MOVIE_FORM.LABEL_TITLE}
							placeholderText={TEXT.MOVIE_FORM.PLACEHOLDER_TITLE}
							value={formData.title}
							onChange={(e) => handleChange('title', e.target.value)}
						/>
					</div>

					<div className={styles.field}>
						<Input
							labelText={TEXT.MOVIE_FORM.LABEL_RELEASE_DATE}
							placeholderText={TEXT.MOVIE_FORM.PLACEHOLDER_RELEASE_DATE}
							value={formData.release_date}
							onChange={(e) => handleChange('release_date', e.target.value)}
							type='date'
						/>
					</div>

					<div className={styles.field}>
						<Input
							labelText={TEXT.MOVIE_FORM.LABEL_POSTER_URL}
							placeholderText={TEXT.MOVIE_FORM.PLACEHOLDER_POSTER_URL}
							value={formData.poster_path}
							onChange={(e) => handleChange('poster_path', e.target.value)}
						/>
					</div>

					<div className={styles.field}>
						<Input
							labelText={TEXT.MOVIE_FORM.LABEL_RATING}
							placeholderText={TEXT.MOVIE_FORM.PLACEHOLDER_RATING}
							value={String(formData.vote_average || '')}
							onChange={(e) => handleChange('vote_average', parseFloat(e.target.value))}
							type='number'
							step='0.1'
						/>
					</div>

					<div className={`${styles.field} ${styles.genreField}`}>
						<label htmlFor='genreSelect'>{TEXT.MOVIE_FORM.LABEL_GENRES}</label>
						<div className={styles.selectWrapper}>
							<select
								id='genreSelect'
								value={formData.genres[0] || ''}
								onChange={(e) => handleGenreChange(e.target.value)}
							>
								<option value=''>Select Genre</option>
								{genresList.map((g) => (
									<option key={g} value={g}>
										{g}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className={styles.field}>
						<Input
							labelText={TEXT.MOVIE_FORM.LABEL_RUNTIME}
							placeholderText={TEXT.MOVIE_FORM.PLACEHOLDER_RUNTIME}
							value={String(formData.runtime || '')}
							onChange={(e) => handleChange('runtime', parseInt(e.target.value, 10))}
							type='number'
						/>
					</div>

					<div className={`${styles.field} ${styles.overview}`}>
						<label>{TEXT.MOVIE_FORM.LABEL_OVERVIEW}</label>
						<textarea
							placeholder={TEXT.MOVIE_FORM.PLACEHOLDER_OVERVIEW}
							value={formData.overview}
							onChange={(e) => handleChange('overview', e.target.value)}
						/>
					</div>

					<div className={styles.buttons}>
						<Button type='button' onClick={handleReset}>
							{TEXT.MOVIE_FORM.BUTTON_RESET}
						</Button>
						<Button type='submit'>{TEXT.MOVIE_FORM.BUTTON_SUBMIT}</Button>
					</div>
				</form>
			)}
		</Modal>
	);
};
