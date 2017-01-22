//express lib
var express = require('express');
//inspect
var util = require('util');

//instantiate express
var app = express();

//import module
var employee = require('./datamanager.js')
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
        //bind to the empty template
    bind.toFile('tpl/cliente.tpl', 
    {
        
    }, 
    function(data) {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

//RIchiesta che mi arriva in post quando clicco sul bottono della form con action="Aggiugi"
app.use('/Aggiungi', function(request, response) 
{
    //se i campi sono stati settati e non a null allora inserisco l'emploeey
    if(request.body.name && request.body.surname && request.body.level && request.body.salary)
    {
       employee.Aggiungi_Employee(parseInt(request.body.id),request.body.name,request.body.surname,parseInt(request.body.level),parseInt(request.body.salary));
    } 
    
    //ritorno nella homepage
    bind.toFile('tpl/cliente.tpl', 
    {
        //non invio nessuno dato
    }, 
    function(data) {
        //write response
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

//Richieste in post per cerca o cancellare
app.use('/searchordelete', function(request, response) 
{

    var impiegato=null;
    //Controllo se nel body c'è qualcosa e anche ne radiobutton
    if(request.body && request.body.radio)
    {
        if(request.body.radio=="cerca")
        {
            //Cerca un emploeey
            impiegato=employee.Search(parseInt(request.body.id_search));
            if(impiegato==null)
            {
                   bind.toFile('tpl/cliente.tpl', 
                    {
                       esiste:"L'utente cercato non esiste", //*< A brief description.// 
                       esiste_flag:false
                    }, 
                    function(data) {
                        //write response
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.end(data);
                    }); 
            }
            else
            {
                    bind.toFile('tpl/cliente.tpl', 
                    {
                        id: impiegato.id,
                        name: impiegato.name,
                        surname: impiegato.surname,
                        level: impiegato.level,
                        salary: impiegato.salary,
                        esiste:"esiste",
                        esiste_flag:true
                    }, 
                    function(data) {
                        //write response
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.end(data);
                    });
            }          
        }
        else
        {
            if(employee.Delete(parseInt(request.body.id_search))==1)
            {
                bind.toFile('tpl/cliente.tpl', 
                {
                   esiste:"Eliminazione avvenuta correttamente"

                }, 
                function(data) {
                    //write response
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                });
            }
            else
            {
                bind.toFile('tpl/cliente.tpl', 
                {
                   esiste:"Eliminazione non avvenuta correttamente"

                }, 
                function(data) {
                    //write response
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                });
            }
        }
    }
    else{
           bind.toFile('tpl/cliente.tpl', 
            {
               esiste:"ciao2"
            }, 
            function(data) {
                //write response
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }); 
    }    
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});