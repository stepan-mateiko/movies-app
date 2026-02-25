import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { logoutUserThunk } from '@/store/thunks';

jest.mock('@/store/hooks', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn(),
}));

jest.mock('@/store/thunks', () => ({
	logoutUserThunk: jest.fn(() => ({ type: 'user/logout' })),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
	useSearchParams: jest.fn(),
}));

describe('Header', () => {
	const mockedUseAppDispatch = useAppDispatch as jest.Mock;
	const mockedUseAppSelector = useAppSelector as jest.Mock;
	const mockedUseNavigate = useNavigate as jest.Mock;
	const mockedUseLocation = useLocation as jest.Mock;
	const mockedUseSearchParams = useSearchParams as jest.Mock;

	const dispatchMock = jest.fn();
	const navigateMock = jest.fn();
	const setSearchParamsMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseAppDispatch.mockReturnValue(dispatchMock);
		mockedUseNavigate.mockReturnValue(navigateMock);
		mockedUseLocation.mockReturnValue({ pathname: '/movies' });
		mockedUseSearchParams.mockReturnValue([new URLSearchParams(), setSearchParamsMock]);
		dispatchMock.mockResolvedValue(undefined);
		mockedUseAppSelector.mockImplementation((selector: any) =>
			selector({
				user: { isAuth: true, role: 'admin' },
			})
		);
	});

	it('renders search and admin actions for authenticated admin', () => {
		render(<Header />);

		expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '+ ADD MOVIE' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'LOGOUT' })).toBeInTheDocument();
	});

	it('runs search by button click', async () => {
		const user = userEvent.setup();
		render(<Header />);

		const input = screen.getByPlaceholderText('What do you want to watch?');
		await user.type(input, 'Pulp');
		await user.click(screen.getByRole('button', { name: 'SEARCH' }));

		expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
	});

	it('navigates on add movie and logout', async () => {
		const user = userEvent.setup();
		render(<Header />);

		await user.click(screen.getByRole('button', { name: '+ ADD MOVIE' }));
		expect(navigateMock).toHaveBeenCalledWith('/movies/add');

		await user.click(screen.getByRole('button', { name: 'LOGOUT' }));
		expect(logoutUserThunk).toHaveBeenCalledTimes(1);
		expect(dispatchMock).toHaveBeenCalled();
		expect(navigateMock).toHaveBeenCalledWith('/login');
	});
});
