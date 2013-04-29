
var _ = require('underscore'),
express = require('express'),
fs = require('fs'),
request = require('request'),
FeedMe = require('feedme')
;


var port = process.env.PORT || 5000;
var app = express();

app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use('/', express.static(__dirname + '/public'));

app.post('/read-url', function (req, resp, next) {
  var parser = new FeedMe(true)
  request(req.body.url, function (err, meta, body) {
    if (err)
      return resp.json({error: err});
    // parser.on('end', function () {
    // });
    parser.write(body);
    return resp.json({success: true, data: parser.done()});
  });
});


app.listen(port, function () {
  console['log']('Listening to: ' + port);
});

function quit() {
  console.log("\n", 'quitting...');
  process.exit();
}

process.on('SIGINT', quit);
process.on('SIGTERM', quit);




