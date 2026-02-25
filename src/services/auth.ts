import { User } from '@/types';
import { BASE_URL, assertOk, parseJson } from './api';

export const loginUser = async (email: string, password: string) => {
	const res = await fetch(`${BASE_URL}/me/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	assertOk(res, 'Login failed');
	const result = await parseJson<{ data: User & { token: string } }>(res);
	return result.data;
};

export const getUser = async (token: string) => {
	const res = await fetch(`${BASE_URL}/me/user`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token }),
	});
	assertOk(res, 'Failed to fetch user');
	const result = await parseJson<{ data: User }>(res);
	return result.data;
};
