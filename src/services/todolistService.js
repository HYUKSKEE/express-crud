const todolistDao = require('../models/todolistDao');

const addTodoList = async ({ userId, todo, isCompleted = false }) => {
	const [addTodo] = await todolistDao.addTodoList({
		userId,
		todo,
		isCompleted,
	});

	{
		let { id, todo, is_completed } = addTodo;
		if (addTodo.is_completed === 0) {
			is_completed = false;
		} else {
			is_completed = true;
		}
		return { id, todo, isCompleted: is_completed };
	}
};

const getTodoList = async ({ userId, limit = '5', offset = '0' }) => {
	console.log('limit,offet', limit, offset);
	const todoList = await todolistDao.getTodoList({
		userId,
		limit,
		offset,
	});

	return todoList.map(({ id, todo, is_completed }) => ({
		id,
		todo,
		isCompleted: is_completed === 0 ? false : true,
	}));
};

const updateTodo = async ({ id, userId, todo, isCompleted }) => {
	await todolistDao.updateTodo({ id, userId, todo, isCompleted });
};

const deleteTodo = async id => {
	await todolistDao.deleteTodo(id);
};

const todolistService = {
	addTodoList,
	getTodoList,
	updateTodo,
	deleteTodo,
};

module.exports = todolistService;
