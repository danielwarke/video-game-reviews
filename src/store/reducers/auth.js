import {AUTH_CHECK_STATE, AUTH_LOGOUT, AUTH_SET_LOGIN_BUTTON, AUTH_LOGIN, AUTH_INIT} from '../actions/auth';

const initialState = {
	token: null,
	userId: null,
	loginButton: 'Login'
};

const authLogout = (state, action) => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	
	return {
		...state,
		token: null,
		userId: null
	};
};

const authLogin = (state, action) => {
	localStorage.setItem('token', action.token);
	localStorage.setItem('userId', action.userId);
	localStorage.setItem('expirationDate', action.expirationDate);
	
	return {
		...state,
		token: action.token,
		userId: action.userId
	};
};

const authCheckState = (state, action) => {
	const token = localStorage.getItem('token');
	
	if (!token) {
		return authLogout();
	} else {
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (expirationDate > new Date()) {
			const userId = localStorage.getItem('userId');
			
			return {
				...state,
				userId: userId,
				token: token
			};
		} else {
			return authLogout();
		}
	}
};

const authSetLoginButton = (state, action) => {
	return {
		...state,
		loginButton: action.loginButton
	};
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_CHECK_STATE:
			return authCheckState(state, action);
		case AUTH_LOGIN:
			return authLogin(state, action);
		case AUTH_LOGOUT:
			return authLogout(state, action);
		case AUTH_SET_LOGIN_BUTTON:
			return authSetLoginButton(state, action);
		case AUTH_INIT:
			return state;
		default:
			return state;
	}
};

export default authReducer;
