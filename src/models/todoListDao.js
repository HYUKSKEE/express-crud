const database = require('./database');

const addTodoList = async ({ userId, todo, isCompleted }) => {
	try {
		await database.query(
			`
            INSERT INTO todolist (
                user_id,
                todo,
                is_completed
                ) VALUES (?, ?, ?);
                `,
			[userId, todo, isCompleted]
		);

		return await database.query(
			`SELECT id, todo, is_completed
            FROM todolist t
            WHERE t.user_id=? AND t.todo=? 
            AND t.is_completed=?`,
			[userId, todo, isCompleted]
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const getTodoList = async ({ userId, limit, offset }) => {
	try {
		return await database.query(
			`SELECT id, todo, is_completed
			FROM todolist
			WHERE todolist.user_id='${userId}'
			ORDER BY todolist.id DESC
			LIMIT ${limit} OFFSET ${offset}`
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const updateTodo = async ({ id, userId, todo, isCompleted }) => {
	try {
		await database.query(
			`UPDATE todolist SET todo=?,
			is_completed=?
			WHERE id=? AND user_id=?`,
			[todo, isCompleted, id, userId]
		);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 400;
		throw error;
	}
};

const deleteTodo = async id => {
	try {
		await database.query(`DELETE FROM todolist WHERE id = '${id}';`);
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUP');
		error.statusCode = 400;
		throw error;
	}
};

const todolistDao = {
	addTodoList,
	getTodoList,
	updateTodo,
	deleteTodo,
};

module.exports = todolistDao;
