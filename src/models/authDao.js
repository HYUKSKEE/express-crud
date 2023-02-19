const database = require('./database');

const signUp = async ({ name, email, password }) => {
	try {
		await database.query(
			`
            INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?, ?, ?);`,
			[name, email, password]
		);

		return await database.query(
			`SELECT id, email FROM users
                WHERE users.email='${email}'`
		);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 400;
		throw error;
	}
};

const signIn = async ({ email, password }) => {
	try {
		return await database.query(
			`SELECT id, email FROM users
			WHERE 
				users.email='${email}' 
			AND users.password='${password}'`
		);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 400;
		throw error;
	}
};

const authDao = {
	signUp,
	signIn,
};

module.exports = authDao;
