//requestHandlers.js
//handles different types of requests for the server
var fs = require("fs");
var formidable = require("formidable");



//main menu
function reqStart(response, postData){
	console.log("Request handler start was called");
	fs.readFile('index.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html", "Content-Length": data.length});
		response.write(data);
		response.end();
	})
	
}

//displays add student form
function reqAddStudent(response, postData) {
	fs.readFile('addStudentForm.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html", "Content-Length": data.length});
		response.write(data);
		response.end();
	});
}


//calculates students in same degree, displays along with number
function reqSameDegree(response, postData) {

	fs.readFile('searchDegreeForm.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html", "Content-Length": data.length});
		response.write(data);
		response.end();
	});

	
}

//allows upload of image files
function reqStartUpload(response) {
	console.log("Request handler 'reqStartUpload' was called.");
	var body = fs.readFile('uploadImage.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	})
}

function reqUpload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("... about to parse ...");
	form.parse(request, function(err, fields, files) {
		console.log("parsing done");
		fs.rename(fields.upload, "/tmp/image.png", function(err) {
			if(err) {
				fs.unlink("/tmp/image.png");
				fs.rename(fields.upload, "/tmp/image/png");
			}
		});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Recieved image:<br/>"+"<img src='/show' />");
	response.end();
	})
}

//shows the image after uploading
function reqShow(response) {
	console.log("Request handler 'show' was called");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/image.png").pipe(response);
}

exports.reqAddStudent = reqAddStudent;
exports.reqSameDegree = reqSameDegree;
exports.reqStartUpload = reqStartUpload;
exports.reqShow = reqShow;
exports.reqUpload = reqUpload;
exports.reqStart = reqStart;