import React, { useState } from 'react';

export const AuthContext = React.createContext({
	token: null,
	userId: null,
	username: null,
	email: null,
	isAdmin: false,
	loginButton: 'Login',
	login: (token, userId, expiresIn) => {},
	logout: () => {},
	setLoginButton: (loginButton) => {},
	checkState: () => {}
});

export default props => {
	const [authState, setAuthState] = useState({
		token: null,
		userId: null,
		username: null,
		email: null,
		isAdmin: false,
		loginButton: 'Login'
	});
	
	const login = (token, userId, username, email, isAdmin, expiresIn) => {
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
		localStorage.setItem('username', username);
		localStorage.setItem('email', email);
		localStorage.setItem('admin', isAdmin);
		
		const expirationDate = new Date(new Date().getTime() + (+expiresIn * 60 * 1000));
		localStorage.setItem('expirationDate', expirationDate);
		
		setAuthState({
			...authState,
			token: token,
			userId: userId,
			username: username,
			email: email,
			isAdmin: isAdmin,
			loginButton: 'Logout'
		});
	};
	
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		localStorage.removeItem('email');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('admin');
		
		setAuthState({
			...authState,
			token: null,
			userId: null,
			username: null,
			email: null,
			isAdmin: false,
			loginButton: 'Login'
		});
	};
	
	const setLoginButton = (loginButton) => {
		setAuthState({
			...authState,
			loginButton: loginButton
		});
	};
	
	const checkState = () => {
		const token = localStorage.getItem('token');
		
		if (!token) {
			logout();
			return false;
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				const isAdmin = localStorage.getItem('admin');
				const username = localStorage.getItem('username');
				const email = localStorage.getItem('email');
				
				setAuthState({
					...authState,
					token: token,
					userId: userId,
					username: username,
					email: email,
					isAdmin: isAdmin === 'true',
					loginButton: 'Logout'
				});
				
				return true;
			} else {
				logout();
				return false;
			}
		}
	};
	
	const authValue = {
		...authState,
		login: login,
		logout: logout,
		setLoginButton: setLoginButton,
		checkState: checkState
	};
	
	return (
		<AuthContext.Provider value={authValue}>
			{props.children}
		</AuthContext.Provider>
	);
};
