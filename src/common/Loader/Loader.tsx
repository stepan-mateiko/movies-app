import React from 'react';
import { LoaderProps } from '@/types';
import { TEXT } from '@/constants/text-constants';
import styles from './styles.module.scss';

export const Loader: React.FC<LoaderProps> = ({ message }) => {
	const label = message || TEXT.COMMON.LOADING;

	return (
		<div className={styles.loader} role="status" aria-live="polite" aria-label={label}>
			<div className={styles.spinner} />
			<span className={styles.text}>{label}</span>
		</div>
	);
};
