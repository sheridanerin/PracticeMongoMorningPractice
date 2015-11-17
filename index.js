var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongojs = require('mongojs')
    , port = 8000
    , db = mongojs('menu')
    , Food = db.collection('food');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/food', function( req, res ) {	
	Food.insert(req.body, function( err, data ) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

app.get('/api/food', function( req, res ) {
	Food.find({}, function( err, data ) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

app.delete('/api/food/:id', function ( req, res ) {
	Food.remove({ '_id': mongojs.ObjectId(req.params.id)}, function(err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

app.put('/api/food/:id', function( req, res) {
	Food.update({ '_id': mongojs.ObjectId(req.params.id)}, { calories: req.body.calories }, function( err, data ) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	})
})

app.listen(port, function() {
	console.log('listening on port ' + port);
});