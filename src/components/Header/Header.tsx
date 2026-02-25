import React, { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUserThunk } from '@/store/thunks';
import { ROUTE_PATHS } from '@/constants/constants';
import { Button, Input } from '@/common';
import { TEXT } from '@/constants/text-constants';
import { isMovieDetailsPath } from '@/handlers/handlers';
import styles from './styles.module.scss';
import LogoIcon from '@/assets/icons/LogoIcon';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

	const isMovieDetailsRoute = isMovieDetailsPath(location.pathname);

	const handleLogoClick = () => navigate('/movies');

	const handleAddMovie = () => navigate('/movies/add');

	const handleLogout = async () => {
		await dispatch(logoutUserThunk());
		navigate(ROUTE_PATHS.LOGIN);
	};

	const handleSearch = () => {
		if (searchValue.trim()) searchParams.set('search', searchValue.trim());
		else searchParams.delete('search');
		setSearchParams(searchParams);
	};

	const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSearch();
	};

	return (
		<header className={styles.headerContainer}>
			<div className={styles.logo} onClick={handleLogoClick}>
				<LogoIcon />
			</div>
			<div className={styles.leftSection}>
				{!isMovieDetailsRoute && user.isAuth && (
					<div className={styles.searchBlock}>
						<h1 className={styles.findText}>{TEXT.HEADER.FIND_YOUR_MOVIE}</h1>
						<Input
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholderText={TEXT.HEADER.SEARCH_PLACEHOLDER}
							labelText={TEXT.HEADER.SEARCH_LABEL}
							onKeyDown={handleInputKeyPress}
						/>
						<Button onClick={handleSearch}>{TEXT.HEADER.SEARCH_BUTTON}</Button>
					</div>
				)}
			</div>

			<div className={styles.rightSection}>
				{user.isAuth && user.role === 'admin' && (
					<Button onClick={handleAddMovie} variant='primary'>
						{TEXT.HEADER.ADD_MOVIE}
					</Button>
				)}

				{user.isAuth && (
					<div className={styles.userMenuWrapper}>
						<Button onClick={handleLogout}>{TEXT.HEADER.LOGOUT}</Button>
					</div>
				)}
			</div>
		</header>
	);
};
