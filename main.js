var express = require('express');
var bodyParser = require('body-parser');
var connexion= require('./JS/connexion.js');
const exec = require('child_process').exec;
var fs = require('fs');


var app = express();
app.use("/css",  express.static(__dirname + '\\css'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.render(__dirname + '\\view\\index',{connection:"Connection DOWN!"});
});

app.post("/", function (req, res) {
    var connection="Connection DOWN!";
    if (fs.existsSync(req.body.path+'\\mongod.exe')) {
        exec("start "+ req.body.path +'\\mongod.exe');
        if(req.body.recreate =="on"){
            exec("mongoimport --db Application_database --collection reuters --drop --file reuters.json",{cwd: req.body.path})
        }
        connection="Connection UP!";
    }
    res.render(__dirname + '\\view\\index',{connection:connection});
});

app.post("/auto", function (req, res) {
    var result=JSON.parse(req.body.query)
    if(result.agg==1){
        connexion.aggregate(result,function(err,data){
            res.render(__dirname + '\\view\\result',{result:data});
        })
    }
    else{
        connexion.find(JSON.stringify(result),function(err,data){
            res.render(__dirname + '\\view\\result',{result:data});
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
        res.render(__dirname + '\\view\\result',{result:data});
    })
});



app.listen(8888);
console.log("Magic happens on the 8888 port!");
