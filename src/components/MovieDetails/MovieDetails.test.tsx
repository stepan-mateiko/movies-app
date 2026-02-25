import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';
import { useAppSelector } from '@/store/hooks';
import { useParams } from 'react-router-dom';

jest.mock('@/store/hooks', () => ({
	useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: jest.fn(),
}));

describe('MovieDetails', () => {
	const mockedUseAppSelector = useAppSelector as jest.Mock;
	const mockedUseParams = useParams as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders not found state when movie is missing', () => {
		mockedUseParams.mockReturnValue({ movieId: '1' });
		mockedUseAppSelector.mockImplementation((selector: any) =>
			selector({
				movies: { list: [] },
			})
		);

		render(<MovieDetails />);

		expect(screen.getByText('Movie not found')).toBeInTheDocument();
	});

	it('renders movie details data', () => {
		mockedUseParams.mockReturnValue({ movieId: '7' });
		mockedUseAppSelector.mockImplementation((selector: any) =>
			selector({
				movies: {
					list: [
						{
							id: 7,
							title: 'Pulp Fiction',
							vote_average: 8.9,
							release_date: '1994-10-14',
							poster_path: '/poster.jpg',
							overview: 'Movie overview',
							genres: ['Action', 'Adventure'],
							runtime: 154,
						},
					],
				},
			})
		);

		render(<MovieDetails />);

		expect(screen.getByRole('heading', { name: 'Pulp Fiction' })).toBeInTheDocument();
		expect(screen.getByText('8.9')).toBeInTheDocument();
		expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
		expect(screen.getByText('1994')).toBeInTheDocument();
		expect(screen.getByText('2h 34min')).toBeInTheDocument();
		expect(screen.getByText('Movie overview')).toBeInTheDocument();
		expect(screen.getByAltText('Pulp Fiction')).toHaveAttribute('src', '/poster.jpg');
	});
});
