// Create a web Server that can return comments from a database
// The server will be able to handle requests for comments
// The server will be able to handle a request to add a comment
// The server will be able to handle a request to delete a comment

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/commentDB');

// Create a new express app
var app = express();

// Use body-parser to parse the body of requests that are sent to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set the port for the server to listen on
app.listen(8080, function(){
	console.log('Server is listening on port 8080');
});

// Create a new comment
app.post('/comments', function(req, res){
	var comment = new Comment(req.body);
	comment.save(function(err, comment){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(201);
		}
	});
});

// Get all comments
app.get('/comments', function(req, res){
	Comment.find({}, function(err, comments){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(comments);
		}
	});
});

// Get a single comment by ID
app.get('/comments/:id', function(req, res){
	Comment.findOne({_id: req.params.id}, function(err, comment){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(comment);
		}
	});
});

// Update a comment by ID
app.put('/comments/:id', function(req, res){
	Comment.findOneAndUpdate({_id: req.params.id}, req.body, function(err, comment){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

// Delete a comment by ID
app.delete('/comments/:id', function(req, res){
	Comment.findOneAndRemove({_id: req.params.id}, function(err, comment){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});



