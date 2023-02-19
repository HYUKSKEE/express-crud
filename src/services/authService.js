const jwt = require('jsonwebtoken');

const authDao = require('../models/authDao');

// validation하는 service
const signUp = async ({ name, email, password }) => {
	const pwValidation = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

	if (!pwValidation.test(password)) {
		const err = new CustomError('PASSWORD_IS_NOT_VALID');
		err.statusCode = 400;
		throw err;
	}

	const [userInfo] = await authDao.signUp({
		name,
		email,
		password,
	});
	if (process.env.JWT_SECRET) {
		return jwt.sign(
			{ sub: userInfo.id, email: userInfo.email },
			process.env.JWT_SECRET
		);
	}
};

const signIn = async ({ email, password }) => {
	const [userInfo] = await authDao.signIn({ email, password });

	if (!userInfo) {
		const err = new CustomError('NO_USER_INFO');
		err.statusCode = 400;
	}
	if (process.env.JWT_SECRET) {
		return jwt.sign(
			{ sub: userInfo.id, email: userInfo.email },
			process.env.JWT_SECRET
		);
	}
};

const authService = {
	signUp,
	signIn,
};
module.exports = authService;
