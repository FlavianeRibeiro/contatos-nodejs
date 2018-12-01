
/**
 * Module dependencies.
 */

var express = require('express')
  , load = require('express-load')// vai gerenciar 
  , http = require('http')
  , path = require('path');
var app = express();
var mongoose = require("mongoose");
var db = mongoose.connect;

mongoose.connect('mongoose://localhost/trabalho', function(err){
  if(err){
    console.log('Erro ao concetar ao mongodb'+err);
  }else{
    console.log('concetado ao Banco ...')
  }
});

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// carregar os models onde estará os projetos
load('models').then('controllers').then('routes').into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
