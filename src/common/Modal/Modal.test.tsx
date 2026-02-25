import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('Modal', () => {
	const navigateMock = jest.fn();
	const mockedUseNavigate = useNavigate as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseNavigate.mockReturnValue(navigateMock);
	});

	it('renders children content', () => {
		render(
			<Modal onClose={jest.fn()}>
				<div>Modal Content</div>
			</Modal>
		);

		expect(screen.getByText('Modal Content')).toBeInTheDocument();
	});

	it('calls onClose when overlay is clicked', () => {
		const onClose = jest.fn();
		render(
			<Modal onClose={onClose}>
				<div>Modal Content</div>
			</Modal>
		);

		const overlay = document.querySelector('.overlay');
		expect(overlay).not.toBeNull();
		fireEvent.click(overlay as Element);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes on Escape key press', () => {
		const onClose = jest.fn();
		render(
			<Modal onClose={onClose}>
				<div>Modal Content</div>
			</Modal>
		);

		fireEvent.keyDown(document, { key: 'Escape' });
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('navigates to movies when closed without onClose prop', () => {
		render(
			<Modal>
				<div>Modal Content</div>
			</Modal>
		);

		fireEvent.click(screen.getByTestId('closeModal'));
		expect(navigateMock).toHaveBeenCalledWith('/movies');
	});
});
