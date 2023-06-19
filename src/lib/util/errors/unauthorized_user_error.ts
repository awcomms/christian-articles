export const unauthorized_user_error = (
	email: string
) => `The currently logged in user, ${email}, is not authorised
		 to perform this action`;
