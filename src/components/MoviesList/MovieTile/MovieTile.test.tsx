import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieTile } from './MovieTile';
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

jest.mock('@/store/hooks', () => ({
	useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('MovieTile', () => {
	const mockedUseAppSelector = useAppSelector as jest.Mock;
	const mockedUseNavigate = useNavigate as jest.Mock;
	const navigateMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseNavigate.mockReturnValue(navigateMock);
	});

	it('navigates to movie details on tile click', async () => {
		const user = userEvent.setup();
		mockedUseAppSelector.mockImplementation((selector: any) =>
			selector({
				user: { role: 'user' },
			})
		);

		render(
			<ul>
				<MovieTile
					id={5}
					title='Inception'
					release_date='2010-07-16'
					poster_path='/inception.jpg'
					genres={['Sci-Fi']}
				/>
			</ul>
		);

		await user.click(screen.getByText('Inception'));
		expect(navigateMock).toHaveBeenCalledWith('/movies/5');
	});

	it('shows admin menu actions and handles delete confirmation', async () => {
		const user = userEvent.setup();
		const onDelete = jest.fn();
		mockedUseAppSelector.mockImplementation((selector: any) =>
			selector({
				user: { role: 'admin' },
			})
		);

		render(
			<ul>
				<MovieTile
					id={11}
					title='Interstellar'
					release_date='2014-11-07'
					poster_path='/interstellar.jpg'
					genres={['Drama']}
					onDelete={onDelete}
				/>
			</ul>
		);

		await user.click(screen.getByTestId('menu-button'));
		expect(screen.getByTestId('context-menu')).toBeInTheDocument();

		await user.click(screen.getByTestId('edit-button'));
		expect(navigateMock).toHaveBeenCalledWith('/movies/edit/11');

		await user.click(screen.getByTestId('delete-button'));
		expect(screen.getByText('DELETE MOVIE')).toBeInTheDocument();

		await user.click(screen.getByText('CONFIRM'));
		expect(onDelete).toHaveBeenCalledTimes(1);
	});
});
