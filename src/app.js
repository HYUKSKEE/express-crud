const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const { router } = require('./routes');

const app = express();
app.use(cors()); // cors 끄고 한보기
app.use(morgan('combined')); // 끄고 차이 느껴보기
app.use(router);
app.get('/ping', (req, res) => {
	res.send('pong');
	// res.json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
	try {
		server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
	} catch (err) {
		console.log(`start error ==> ${err}`);
	}
};
start();
