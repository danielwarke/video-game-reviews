export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_SET_LOGIN_BUTTON = 'AUTH_SET_LOGIN_BUTTON';
export const AUTH_INIT = 'AUTH_INIT';

export const authCheckState = () => {
	return { type: AUTH_CHECK_STATE };
};

export const authLogout = () => {
	return { type: AUTH_LOGOUT };
};

export const authLogin = (token, userId, expirationDate) => {
	return {
		type: AUTH_LOGIN,
		token: token,
		userId: userId,
		expirationDate: expirationDate
	};
};

export const authSetLoginButton = (loginButton) => {
	return {
		type: AUTH_SET_LOGIN_BUTTON,
		loginButton: loginButton
	};
};

export const authInit = () => {
	return { type: AUTH_INIT };
};
