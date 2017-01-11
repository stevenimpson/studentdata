//router.js
//route function takes pathname as a parameter
function route(handle, pathname, response, request){
	console.log("About to route a request for " + pathname);

	//checks that path points to an existing handler
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, request); //calls appropriate function in requestHandler.js
	}
	else {
		console.log("No request handler found for: " + pathname);
		response.writeHead(404, {"Content-Type" : "text/plain"});
		response.write("Resource not found.");
		response.end();
	}
}

//exports the route function, making available to other scripts
exports.route = route;