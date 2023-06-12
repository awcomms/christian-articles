import { get } from '../get';

export const user_or_creator = async (id: string, email: string): Promise<boolean> => {
	const { creator } = await get<{ creator: string }>(id, ['$.creator']);
	const { users } = await get<{ users: string[] }>(id, ['$.users']);

	return email === creator || users.includes(email);
};
