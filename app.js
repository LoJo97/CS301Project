const http = require('http');
const url = require('url');
const fs = require('fs');
const mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, res) => {
	var q = url.parse(request.url, true);
	var filename = '.' + q.pathname;

	fs.readFile(filename, (err, data) => {
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end('404 Not Found');
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});

	let body = [];

	request.on('error', err => {
		console.error(err);
	})
	.on('data', chunk => {
		body.push(chunk);
	})
	.on('end', () => {
		body = Buffer.concat(body).toString();
	});
}).listen(port);

const database = mysql.createConnection({
	host: 'localhost',
	username: 'root',
	password: ''
	//database: 'CS301_database'
});

const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('query', (query, fn) => {
		database.connect(err => {
			if(err) fn('Connection Failed\n' + err);
			else fn("Connected!\n");
		});
	});
});