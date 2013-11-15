var fs = require('fs');
//http://www.nodemailer.com/
var nodemailer = require("nodemailer");
var file = __dirname + '/testdb.js';

var items = [];

function conditionalAction(condition, action){
	if (condition)
		action();
} 


function sendMail(){
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "mailinator",
	    auth: {
	        user: "jarekppp@mailinator.com",
	        pass: ""
	    }
	});

	var mailOptions = {
	    from: "jarek jarekppp@mailinator.com", // sender address
	    to: "jarekppp@mailinator.com", // list of receivers
	    subject: "Hello", // Subject line
	    text: "Hello world", // plaintext body
	    html: "Hello world" // html body
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }
	    console.log("mail sent");
	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
}

var lastCheck = 0;

setInterval(function(){
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		} 
	  	
	  	data = JSON.parse(data);
	  	
	  	//;

conditionalAction(data.length > lastCheck, sendMail);
	  	if (data.length > lastCheck)
		{
			lastCheck = data.length;
			console.log(lastCheck);

		}


	});
}, 10);