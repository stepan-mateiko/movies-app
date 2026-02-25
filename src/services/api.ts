export const BASE_URL = 'https://movies-app-backend-qxv7.onrender.com';

export const assertOk = (res: Response, message: string) => {
	if (!res.ok) {
		throw new Error(message);
	}
};

export const parseJson = async <T>(res: Response) => {
	return (await res.json()) as T;
};
