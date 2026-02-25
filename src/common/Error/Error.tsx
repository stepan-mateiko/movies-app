import React from 'react';
import { ErrorProps } from '@/types';
import { TEXT } from '@/constants/text-constants';
import styles from './styles.module.scss';

export const Error: React.FC<ErrorProps> = ({ message }) => {
	const errorMessage = message || TEXT.COMMON.ERROR_DEFAULT;

	return (
		<div className={styles.error} role="alert">
			<span className={styles.prefix}>{TEXT.COMMON.ERROR_PREFIX}</span>
			<span>{errorMessage}</span>
		</div>
	);
};
