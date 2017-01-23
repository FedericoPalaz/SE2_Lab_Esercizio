//express lib
var express = require('express');
//inspect
var util = require('util');

//instantiate express
var app = express();

//import module
var data = require('./datamanager.js')
//for templates
var bind = require('bind');



//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 3500));
app.use(express.static(__dirname+"/scripts"));

//RIchiesta in get che mi arriva appena apro la homepage
app.get('/', function(req, res) 
{   
	res.statusCode = 200;
        res.render('pagina.ejs');
});

//RIchiesta che mi arriva in post quando clicco sul bottono della form con action="Aggiugi"
app.use('/invia', function(request, response) 
{
	      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      //headers["Access-Control-Allow-Origin"] = request.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      //answer
      headers["Content-Type"] = "text/html";
		var trovato=0;
	    //se i campi sono stati settati e non a null allora inserisco l'emploeey
	    if(request.body.nome && request.body.cognome)
	    {
	       if(data.cerca(request.body.nome,request.body.cognome)==0){
			//nulla
			trovato=0;
		}else
		{
			//ok
			trovato=1;
		}
	    } 
        if(trovato==1)
	{
		response.writeHead(200, headers);
		response.end("hello, Mr " + request.body.nome +" " +request.body.cognome);
	}
	else
	{
		response.writeHead(400, headers);
		response.render('pagina.ejs');
		
	}		
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
