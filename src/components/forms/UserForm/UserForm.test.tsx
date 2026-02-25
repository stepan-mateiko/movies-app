import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UserForm } from './UserForm';
import { useAppDispatch } from '@/store/hooks';
import { loginUserThunk } from '@/store/thunks';
import { createUser } from '@/services';

const navigateMock = jest.fn();

jest.mock('@/store/hooks', () => ({
	useAppDispatch: jest.fn(),
}));

jest.mock('@/store/thunks', () => ({
	loginUserThunk: jest.fn(() => ({ type: 'user/login' })),
}));

jest.mock('@/services', () => ({
	createUser: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => navigateMock,
}));

describe('UserForm', () => {
	const mockedUseAppDispatch = useAppDispatch as jest.Mock;
	const dispatchMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseAppDispatch.mockReturnValue(dispatchMock);
		dispatchMock.mockReturnValue({
			unwrap: () => Promise.resolve(),
		});
	});

	it('shows validation errors on empty submit in registration mode', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter>
				<UserForm mode='registration' />
			</MemoryRouter>
		);

		await user.click(screen.getByRole('button', { name: /register/i }));

		expect(screen.getByText('Name is required')).toBeInTheDocument();
		expect(screen.getByText('Email is required')).toBeInTheDocument();
		expect(screen.getByText('Password is required')).toBeInTheDocument();
	});

	it('submits login form and navigates to movies', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter>
				<UserForm mode='login' />
			</MemoryRouter>
		);

		await user.type(screen.getByPlaceholderText('enter email'), 'a@a.com');
		await user.type(screen.getByPlaceholderText('enter password'), 'secret');
		await user.click(screen.getByRole('button', { name: /login/i }));

		expect(loginUserThunk).toHaveBeenCalledWith({ email: 'a@a.com', password: 'secret' });
		expect(dispatchMock).toHaveBeenCalled();
		expect(navigateMock).toHaveBeenCalledWith('/movies');
	});

	it('submits registration form and navigates to login', async () => {
		const user = userEvent.setup();
		(createUser as jest.Mock).mockResolvedValue({});

		render(
			<MemoryRouter>
				<UserForm mode='registration' />
			</MemoryRouter>
		);

		await user.type(screen.getByPlaceholderText('enter name'), 'Test User');
		await user.type(screen.getByPlaceholderText('enter email'), 'test@mail.com');
		await user.type(screen.getByPlaceholderText('create password'), 'secret');
		await user.click(screen.getByRole('button', { name: /register/i }));

		expect(createUser).toHaveBeenCalledWith({
			name: 'Test User',
			email: 'test@mail.com',
			password: 'secret',
		});
		expect(navigateMock).toHaveBeenCalledWith('/login');
	});
});
