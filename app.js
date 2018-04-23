var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.use(express.logger());
});

app.get('/', function(req, res) {
  if (!req.query["q"]) {
    return res.render('index');
  }
  query = req.query["q"];
  encQuery = encodeURIComponent(query);

  function callGoogle(searchQuery) {
    console.log('Queried Google');
    if (req.query['google']) {
      res.redirect('https://' + req.query['google'] + '/search?q=' + searchQuery);
    } else {
      res.redirect('https://www.google.com/search?q=' + searchQuery);
    }
  }

  bang = query.match(/![A-Za-z0-9]+/);
  googleBangs = ['!g', '!google'];
  // check if we can handle the google bang locally without DuckDuckGo
  if (bang && googleBangs.indexOf(bang[0]) !== -1) {
      return callGoogle(encQuery.replace(bang[0], ''));
  }

  if (bang || query.substring(0, 2) === "! " || query.substring(0, 1) === "\\") {
    console.log('Queried DuckDuckGo');
    return res.redirect('https://duckduckgo.com?q=' + encQuery);
  }
  
  // no bang in search query
  // handle searchengine fallback
  if (req.query['searchengine']) {
    console.log('Queried custom search engine');
    searchEngine = req.query['searchengine'];
    if (searchEngine.search() != -1 && (searchEngine.lastIndexOf('http://', 0) === 0 || searchEngine.lastIndexOf('https://', 0) === 0)) {
      customSearchURL = searchEngine.replace(/%q/g, encQuery);
      return res.redirect(customSearchURL);
    }
    console.log('Error in search engine syntax. Using Google.');
  }

  // default to Google
  return callGoogle(encQuery);
});

app.get('/browser', function(req, res) {
  res.render('browser');
});

app.get('/privacy', function(req, res) {
  res.render('privacy');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
