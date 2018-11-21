const http = require('http'); //Server
const url = require('url'); //URL functions
const fs = require('fs'); //Page handling
const mysql = require('mysql'); //MySQL handling

const hostname = '127.0.0.1';
const port = 3000;

//Start server
const server = http.createServer((request, res) => {
	//Display correct file on request
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
}).listen(port); //Listen for requests

//Handles communications between server and client
const io = require('socket.io')(server);

io.on('connection', socket => { //Client connected
	socket.on('query', (query, fn) => { //Wait for client
		//Create database connection
		const database = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'CS301_Project_Database'
		});
		database.connect(err => {
			if(err) fn('Connection Failed: ' + err);
			else{
				database.query(query, (err, result, fields) => { //Perform query
					if(err) fn(err);
					else fn(result);
				});
			}
		});
	});
});