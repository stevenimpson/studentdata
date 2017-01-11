A node.js server for creating, saving and searching student data

Introduction
This assignment involves setting up a web server using Node.js. My implementation uses an index.js script to bootstrap the web server process, which incorporates scripts which separately handle serving content, handling requests, routing requests and serving web pages to clients.
The assignment assumes that users will be accessing the server from a standards compliant web browser as certain elements do not function correctly in certain browsers that do not adhere to standards (one example is the required attribute in forms, Safari will allow submission of forms with unfilled required fields while Chrome correctly will prompt the user for input).

Non-core modules
No external modules were used in this project, aside from the required node-formidable.
Some core modules were used which have not been covered in lectures or labs thus far.

readline module used in order to read lines of streams, line by line and parse them for use in the application. Using the createInterface function of readline, I could read my csv file line by line, extracting appropriate data to search against and storing the lines as appropriate.

Overall design description
The server starts with a bootstrap script to initiate all required processes. It pulls in the other scripts necessary (a Server, a Router and a Request Handler) and defines a handle object. It then starts the server, by calling the exported startServer function, passing the route function and the previously defined handle object.

The server takes these arguments, and using the http core node module, starts a server. The server function contains a callback function which listens for requests, and parses them into a usable pathname (for example ‘/start’). It displays this pathname to console (for debug purposes).
The server contains some functions for dealing with POST data. If new data is received, it will output this data to console then parse it into an associative array using the query string function ‘parse’.

From here, different script snippets are run depending on whether the POST data begins with the string ‘searchedDegree’ or the string ‘studentid’. This is used to determine the different processing required by the options to add new students to a file, or search that file for matching students.

The add student function uses the parsed data array created earlier, creates a new string named thisStudent. This string is then assigned the values from the parsedData array separated by commas.

This string is then used to append the studentdata.csv file on the server. Using the append function will create this file if it does not exist, or add new data to the existing file. This successfully collects and stores data from the Add Student form in the comma separated value format specified by the assignment requirements.
The second function dealing with POST data is one which searches the csv file line by line (using the readline module of Node.js) and checks to see whether the degree recorded for that student matches the term searched for by the user, creating a currentStudent object which is populated with the attributes according to the line of the csv file being read at that point.
The script then creates an array of currentStudents, which are pushed to the array when the degree matches the search term given by the user. I ran into trouble actually displaying this array to the user however. I attempted to use a MakeTable.js script to dynamically generate the table according to data in my matchingStudents array, but whenever I tried to display this I received an error message in the browser “cannot parse response”. I have not yet had time to debug this issue, and so currently the function to find students whose degree matches the users is not fully functional.

When all POST data is dealt with, or if there is no POST data to deal with, the server calls the route function of the router script, and passes it the handle, as well as pathname, response and request so that these can be used in upcoming functions.

The router function outputs to console details of which request it is about to route, or presents an appropriate error message when the pathname given does not match a function in requestHandlers, and provides a 404 header to the browser to indicate that the resource was not found.

If a function does exist in the requestHandlers, the router calls the appropriate function as per the pathname request and passes the response and request variables to it.

My requestHandlers script contains a series of functions which activate according to the different requests that might be made by a user or the server. For the add Student, search Degree and image upload requests the handler serves up appropriate static HTML pages by reading them from files with the fs node module. Links within the html pages served may themselves contain links to pathnames, which will be routed to secondary handlers to provide other functions such as image upload and showing of said image once upload is complete.


Data structures
The main interesting data structures used within this project are those storing data about students, entered in the Add Student form. Data is stored in an associative array containing studentid, firstname, lastname, age, gender and degree. This is used by the search function as well as to populate the csv file written to disk as part of adding students. The use of an associative array allowed for simple access of individual attributes of each student for processing and storage. This csv file itself is another data structure, storing each student’s data on a single line in a specific order so that it can be parsed and used later.
