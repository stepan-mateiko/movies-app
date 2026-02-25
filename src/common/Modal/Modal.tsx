import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { ROUTE_PATHS } from '@/constants/constants';
import { ModalProps } from '@/types';
import { TEXT } from '@/constants/text-constants';
import styles from './styles.module.scss';

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	const navigate = useNavigate();

	const handleClose = useCallback(() => {
		if (onClose) {
			onClose();
		} else {
			navigate(ROUTE_PATHS.MOVIES);
		}
	}, [onClose, navigate]);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [handleClose]);

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={handleClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<Button onClick={handleClose} data-testid='closeModal' className={styles.closeButton}>
					{TEXT.MODAL.CLOSE_ICON}
				</Button>
				<div className={styles.body}>{children}</div>
			</div>
		</div>,
		document.body
	);
};
