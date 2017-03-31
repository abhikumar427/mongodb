var MongoClient = require('mongodb').MongoClient;


module.exports = {
    find: function(request,callback){
        MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
            if (err) {
                console.error(err);
            }
            var collection = db.collection('reuters');
            request= JSON.parse(request);
            collection.find(request.query,request.project).toArray(function(err, docs) {
                callback(null,docs);
            });
        });
    },
    aggregate : function(request,callback){
        MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
            if (err) {
                console.error(err);
            }
            var collection = db.collection('reuters');
            var query=[];
            if(Object.keys(request.match).length !== 0){
                query.push(request.match);
            }
            if(Object.keys(request.project).length !== 0){
                query.push(request.project);
            }
            if(Object.keys(request.group).length !== 0){
                 query.push(request.group);
            }
            if(Object.keys(request.sort).length !== 0){
                    query.push(request.sort);
            }
            console.log(JSON.stringify(query));
            collection.aggregate(query, function(err, docs) {
                console.log(docs)
                callback(null,docs);
            });
        });
    }

}
