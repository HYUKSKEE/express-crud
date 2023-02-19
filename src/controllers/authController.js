const authService = require('../services/authService');

// 데이터가 제대로 왔는지 확인하는 곳
const signUp = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'KEY_ERROR' });
		}

		const TOKEN = await authService.signUp({ name, email, password });

		return res.status(201).json({
			message: 'SIGNUP_SUCESS',
			TOKEN,
		});
	} catch (err) {
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const TOKEN = await authService.signIn({ email, password });

		return res.status(201).json({
			message: 'SIGNIN_SUCESS',
			TOKEN,
		});
	} catch (err) {
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const authController = {
	signUp,
	signIn,
};

module.exports = authController;
