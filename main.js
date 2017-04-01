var express = require('express');
var bodyParser = require('body-parser');
var connexion= require('./JS/connexion.js');
const exec = require('child_process').exec;
var fs = require('fs');
var request= require('request');
var path = require('path');
var result;


var app = express();
app.use("/css",  express.static(__dirname + '\\css'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/json',function (req,res){
    res.write(JSON.stringify(result,null,4));
})

app.get('/', function (req, res) {
    res.render(__dirname + '\\view\\index',{connection:"Connection DOWN!"});
});

app.post("/", function (req, res) {
    var connection="Connection DOWN!";
    var details= "No connection etablished.";
    if(!fs.existsSync("C:\\data") || !fs.existsSync("C:\\data\\db")){
        exec("mkdir C:\\data\\db");
    }
    if (fs.existsSync(req.body.path+'\\mongod.exe')) {
        var command="start "+ "\"\"  " + '\"'+req.body.path +'\\mongod.exe\"';
        exec(command);
        var pathJson = path.dirname(fs.realpathSync(__filename))+ '\\reuters.json';
        if(req.body.recreate =="on"){
            downloadAddJson(req,pathJson);
        }
        connection="Connection UP!";
    }
    else{
        connection="Connection DOWN! The file dosent exists!";
    }
    res.render(__dirname + '\\view\\index',{connection:connection});
});

app.post("/auto", function (req, res) {
    result=JSON.parse(req.body.query)
    if(result.agg==1){
        connexion.aggregate(result,function(err,data){
            result=data;
            res.render(__dirname + '\\view\\result',{agg:1,result:result});
        })
    }
    else{
        connexion.find(JSON.stringify(result),function(err,data){
            result=data;
            res.render(__dirname + '\\view\\result',{agg:0,result:result});
        })
    }
});

app.post("/search", function (req, res) {

    var request={
        "query" :{},
        "project":{}
    }
    if(req.body.places !== undefined && req.body.places != ""){
        request.query["places"]= {"$regex" : req.body.places, "$options" : "i"};
    }
    if(req.body.title !== undefined && req.body.title != ""){
        request.query["text.title"]= {"$regex" : req.body.title, "$options" : "i"};
    }
    if(req.body.the_body !== undefined && req.body.the_body != ""){
        request.query["text.body"]= {"$regex" : req.body.the_body, "$options" : "i"};
    }
    if(req.body.companies !== undefined && req.body.companies != ""){
        request.query["compaines"]= {"$regex" : req.body.compaines, "$options" : "i"};
    }
    if(req.body.topics !== undefined && req.body.topics != ""){
        request.query["topics"]= {"$regex" : req.body.topics, "$options" : "i"};
    }
    connexion.find(JSON.stringify(request),function(err,data){
        result=data;
        res.render(__dirname + '\\view\\result',{agg:0,result:result});
    })
});



function downloadAddJson(req,pathJson){
    var options = {
        url:"http://raw.githubusercontent.com/absabry/mongodb/master/reuters.json" ,
    };
    request(options, function(err, response, body) {
        if(!err) {
            fs.writeFile('reuters.json', response.body)
        }
    });
    var command= '\"'+req.body.path +'\\mongoimport.exe\" --db test --collection reuters --drop --file '+ '\"'+pathJson+'\"';
    exec(command);
}


app.listen(8888);
console.log("Magic happens on the 8888 port!");
