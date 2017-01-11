//server.js
var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");
var readline = require("readline");
var mt = require("./makeTable");


function startServer(route, handle) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " recieved.");

		request.setEncoding('utf8');
		var postData = "";
		var parsedData = "";

		request.addListener('data', function(dataChunk) {
			postData =+ dataChunk;
			console.log("Recieved POST chunk '" + dataChunk + "'.");

			parsedData = qs.parse(dataChunk);

			//checks if POST string started with 'searchedDegree'
			if(dataChunk.lastIndexOf("searchedDegree", 0) === 0) {
				console.log("degree searched");

				var currentLine; //stores current line for processing
				var currentStudent; //will be used to create an object with attributes for a student
				var matchingStudents = []; //an array in which matching students will be stored
				
				//var searchTerm = prompt("Which degree are you studying?", "Computer Science");

				var rl = readline.createInterface({
					input: fs.createReadStream('studentdata.csv')
				});

				console.log("The searched degree was: " + parsedData.searchedDegree);

				rl.on('line', function(line) {
					//console.log("Line from file: " + line);
					currentLine = line.split(',');
					currentStudent = {
						studentid: currentLine[0],
						firstName: currentLine[1],
						lastName: currentLine[2],
						age: currentLine[3],
						gender: currentLine[4],
						degree: currentLine[5]
						 };

				 	//stores currentStudent in matchingStudents array if their
			 		//degree matches search term
				 	if(currentStudent.degree == parsedData.searchedDegree)
				 	{
				 		matchingStudents.push(currentStudent);
				 	} 

				 	//************TODO make table in HTMLmakeTable()
					 

				});

				var table = mt.makeTable(matchingStudents);
				var body = '<html>'+
							    '<head>'+
							'<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
							'</head>'+ 
							'<body>'+
							table +
							'</body>'+
							'</html>';

				console.log('body');
				response.writeHead(200, {"Content-Type": "text/html"});
				response.write(body);
				
			}	

			//checks if POST string started with studentid (meaning they added a student)
			if(dataChunk.lastIndexOf("studentid", 0) === 0) {
				console.log("student submitted");
				//creates a string which will be a line in csv file
				var thisStudent = parsedData.studentid + "," + parsedData.firstName + "," +
									parsedData.lastName + "," + parsedData.age + "," +
									parsedData.gender + "," + parsedData.degree + "\n";

				fs.appendFile('studentdata.csv', thisStudent, function(err) {
				  if (err) throw err;
				  console.log('The "data to append" was appended to file!');
				});
			}			

			
			
		});

		request.addListener('end', function() {
			
			route(handle, pathname, response, request)
		});
		
	}
	http.createServer(onRequest).listen(41674);
	console.log("Server has started.");
}

exports.startServer = startServer;