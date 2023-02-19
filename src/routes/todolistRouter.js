const express = require('express');

const todolistController = require('../controllers/todolistController');
const validateToken = require('../middleware/validateToken');

const todolistRouter = express.Router();

todolistRouter.post('/', validateToken, todolistController.addTodoList);
todolistRouter.get('/', validateToken, todolistController.getTodoList);
todolistRouter.put('/', validateToken, todolistController.updateTodo);
todolistRouter.delete('/:id', validateToken, todolistController.deleteTodo);

module.exports = todolistRouter;
