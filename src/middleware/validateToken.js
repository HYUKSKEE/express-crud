const jwt = require('jsonwebtoken');

// header 데이터 확인
const validateToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (process.env.JWT_SECRET && token) {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			if (decode.sub) {
				req.body.userId = decode.sub;
				next();
			}
		}
	} catch (err) {
		console.log('errr==================>', err);
		return res.status(401).json({ message: 'INVALID_TOKEN' });
	}
};

module.exports = validateToken;
