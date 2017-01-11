//makeTable.js
//assistant function to create a table from 2D array
function makeTable(anArray) {
    var result = "<table border=2>";
    for(var i=0; i<anArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<anArray[i].length; j++){
            result += "<td>"+anArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

exports.makeTable = makeTable;