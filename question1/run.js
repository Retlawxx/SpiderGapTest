var http = require('http');
var Question1 = require('./question1.js');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let objectToCopy = {
        name: "Paddy",
        address:
        {
            town: "Lerum",
            country: "Sweden"
        }
    };

    let output = [];
    output.push('<h1>original object to copy:</h1>');
    output.push(JSON.stringify(objectToCopy));

    // modify deepCopy object to see if reference is influenced
    let deepCopy = Question1.deepCopy(objectToCopy);
    objectToCopy.address.town = "New York";

    output.push('<h1>deep copy:</h1>');
    output.push(JSON.stringify(deepCopy));
    output.push('<h1>modfied original object to copy:</h1>');
    output.push(JSON.stringify(objectToCopy));

    res.write(output.join(''));
    res.end();
}).listen(8080);