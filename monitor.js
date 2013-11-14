var fs = require('fs');
var file = __dirname + '/testdb.js';

var items = [];
var lastCheck = 0;

function check(checkPoint){
	if (checkPoint > lastCheck)
	{
		lastCheck = checkPoint;
		console.log(lastCheck);
	}
} 



setInterval(function(){
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		} 
	  	
	  	data = JSON.parse(data);
	 	check(data.length);
	});
}, 10);