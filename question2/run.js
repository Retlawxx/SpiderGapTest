var http = require('http');
var Question2 = require('./question2.js');
const Point = require('./point/point.js');
const fs = require('fs');
const Constants = require('./constants.js');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    Question2.getAllPartnersWithinDistanceHTMLOutput(new Point(51.515419, -0.141099), 100, Constants.PARTNERS_FILE_PATH).then(function(output) {
        res.write(output);
        res.end();
    });
}).listen(8888);