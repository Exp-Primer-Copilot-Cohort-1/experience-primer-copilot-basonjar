// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res) {
  var parseObj = url.parse(req.url, true);
  var pathname = parseObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  } else if (pathname === '/post') {
    var comment = parseObj.query;
    comments.push(comment);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  } else if (pathname === '/comment') {
    var comment = parseObj.query;
    comments.push(comment);
    var str = JSON.stringify(comments);
    res.end(str);
  } else {
    fs.readFile('.' + pathname, function(err, data) {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  }
});
server.listen(3000, function() {
  console.log('server is running');
});