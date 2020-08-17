export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	};
};

export const getErrorMessage = (err) => {
	const error = err.response && err.response.data ? err.response.data : {};
	let message = error.data && error.data.length && error.data[0].msg ? error.data[0].msg : error.message;
	if (!message) {
		message = 'Something went wrong!'
	}
	
	return message;
};

export const checkValidity = (value, rules) => {
	let isValid = true;
	
	if (!rules) {
		return true;
	}
	
	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}
	
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	
	if (rules.isEmail) {
		const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		isValid = pattern.test(value) && isValid;
	}
	
	if (rules.maxLength) {
		isValid = value.length <= rules.minLength && isValid;
	}
	
	return isValid;
};
