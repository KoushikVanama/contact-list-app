var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('list',['list']);
var bodyParser= require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contList',function(req,res){
	console.log('got a request');

	db.list.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/contList',function(req,res){
	console.log(req.body);
	db.list.insert(req.body,function(err,doc){
		res.json(doc);
	})
});

app.delete('/contList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.list.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
});

app.get('/contList/:id',function(req,res){
	var id = req.params.id;
		console.log(id)
	db.list.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
});

app.put('/contList/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.list.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name,email: req.body.email,phone:req.body.phone}},
		new: true},function(err, doc) {
			res.json(doc);
		});
});

app.listen(5050);
console.log("Server running on port 5050");