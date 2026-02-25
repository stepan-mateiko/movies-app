import React from 'react';
import { Button } from '@/common';
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { PanelProps } from '@/types';
import { TEXT } from '@/constants/text-constants';

export const Panel: React.FC<PanelProps> = ({ movies }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const genres = React.useMemo(() => {
		return Array.from(new Set(movies.flatMap((m) => m.genres)));
	}, []);

	const filter = searchParams.get('filter') || '';
	const sortBy = searchParams.get('sortBy') || 'release date';

	const handleGenreClick = (genre: string) => {
		if (genre === 'ALL') searchParams.delete('filter');
		else searchParams.set('filter', genre);
		setSearchParams(searchParams);
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	};

	return (
		<div className={styles.panelWrapper}>
			<div className={styles.genresContainer}>
				<Button variant={filter === '' ? 'primary' : 'secondary'} onClick={() => handleGenreClick('ALL')}>
					{TEXT.PANEL.ALL}
				</Button>
				{genres.map((g) => (
					<Button key={g} variant={filter === g ? 'primary' : 'secondary'} onClick={() => handleGenreClick(g)}>
						{g}
					</Button>
				))}
			</div>
			<div className={styles.sortControlContainer}>
				<label>{TEXT.PANEL.SORT_BY}</label>
				<select value={sortBy} onChange={handleSortChange}>
					<option value='release date'>{TEXT.PANEL.RELEASE_DATE}</option>
					<option value='title'>{TEXT.PANEL.TITLE}</option>
				</select>
			</div>
		</div>
	);
};
