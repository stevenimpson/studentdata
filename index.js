//index.js
//bootstraps node server
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var makeTable = require("./makeTable");

//creates a handle object, associative array notation
var handle = {};
handle["/"] = requestHandlers.reqStart; //starts server when URL is accessed
handle["/start"] = requestHandlers.reqStart; //starts server when url/start accessed
handle["/upload"] = requestHandlers.reqUpload; //starts upload handler
handle["/sameDegree"] = requestHandlers.reqSameDegree; //same degree handler
handle["/addStudent"] = requestHandlers.reqAddStudent; //add student handler
handle["/processAddStudent"] = requestHandlers.processAddStudent; //processes adding of students
handle["/startUpload"] = requestHandlers.reqStartUpload; //presents form for upload from user
handle["/show"] = requestHandlers.reqShow; //shows uploaded image after upload


//calls startServer function from server object
//passes route funstion from router
server.startServer(router.route, handle);