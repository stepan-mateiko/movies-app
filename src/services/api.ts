export const BASE_URL = 'http://localhost:4000';

export const assertOk = (res: Response, message: string) => {
	if (!res.ok) {
		throw new Error(message);
	}
};

export const parseJson = async <T>(res: Response) => {
	return (await res.json()) as T;
};
