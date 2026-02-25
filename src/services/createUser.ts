import { RegistrationData } from '@/types';
import { BASE_URL, assertOk } from './api';

export const createUser = async (data: RegistrationData) => {
	const response = await fetch(`${BASE_URL}/me/register`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	assertOk(response, 'Network Error');
};
