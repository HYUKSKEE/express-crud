const express = require('express');
const authRouter = require('./authRouter');
const todolistRouter = require('./todolistRouter');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/todo', todolistRouter);

module.exports = { router };
