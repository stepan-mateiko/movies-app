import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from '@/common';
import styles from './styles.module.scss';
import { useAppSelector } from '@/store/hooks';
import { MovieTileProps } from '@/types';
import { TEXT } from '@/constants/text-constants';

export const MovieTile: React.FC<MovieTileProps> = ({
	id,
	title,
	release_date,
	poster_path,
	genres = [],
	onDelete,
}) => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const userRole = useAppSelector((state) => state.user.role) || 'user';

	const handleTileClick = () => navigate(`/movies/${id}`);
	const handleEdit = () => navigate(`/movies/edit/${id}`);
	const handleDeleteClick = () => setShowDeleteModal(true);
	const handleConfirmDelete = () => {
		if (onDelete) onDelete();
		setShowDeleteModal(false);
	};
	const handleCloseModal = () => setShowDeleteModal(false);

	return (
		<li className={styles.movieTileWrapper} onClick={handleTileClick}>
			<img src={poster_path} alt={title} className={styles.poster} />
			<h3>{title}</h3>
			<p>{genres.join(', ')}</p>
			<p>{new Date(release_date).getFullYear()}</p>

			{userRole === 'admin' && (
				<div className={styles.menuContainer} onClick={(e) => e.stopPropagation()}>
					{!showMenu && (
						<Button className={styles.dots} onClick={() => setShowMenu(!showMenu)} data-testid='menu-button'>
							{TEXT.MOVIE_TILE.MENU}
						</Button>
					)}

					{showMenu && (
						<div className={styles.menuButton} data-testid='context-menu'>
							<Button onClick={handleEdit} data-testid='edit-button'>
								{TEXT.MOVIE_TILE.EDIT}
							</Button>
							<Button onClick={handleDeleteClick} data-testid='delete-button'>
								{TEXT.MOVIE_TILE.DELETE}
							</Button>
							<Button onClick={() => setShowMenu(false)} data-testid='close-button'>
								{TEXT.MOVIE_TILE.CLOSE}
							</Button>
						</div>
					)}
				</div>
			)}

			{showDeleteModal && (
				<Modal onClose={handleCloseModal}>
					<h2>{TEXT.MOVIE_TILE.DELETE_TITLE}</h2>
					<p>{TEXT.MOVIE_TILE.DELETE_CONFIRM}</p>
					<div className={styles.modalButtons}>
						<Button onClick={handleConfirmDelete} variant='danger'>
							{TEXT.MOVIE_TILE.CONFIRM}
						</Button>
						<Button onClick={handleCloseModal}>{TEXT.MOVIE_TILE.CLOSE}</Button>
					</div>
				</Modal>
			)}
		</li>
	);
};
