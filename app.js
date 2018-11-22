var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var marked = require('marked');
var device = require('express-device');


var mapstyle = JSON.parse(fs.readFileSync('json/googlestyle.json'));


//body parser
app.use(bodyParser.urlencoded({
	extended: true
}));

// routes
app.set('view engine', 'pug');
app.use(express.static('static'));

// device type passthrough
app.use(device.capture());
device.enableViewRouting(app, {
    "noPartials":true
});
app.set('view options', { layout: true });

app.get('/', function(req, res, next) {
	console.log("name is: "+req.device.type);
	var maplocations = JSON.parse(fs.readFileSync('json/maps.json'));

	if(req.device.type === 'phone') {
		console.log('mobile')
		res.render(
		'mobile/index', {
			maps: mapstyle,
			maplocations: maplocations,
			now: fs.readFileSync('static/html/now.html')
		});
	}

	res.render(
		'index', {
			maps: mapstyle,
			maplocations: maplocations,
			now: fs.readFileSync('static/html/now.html')
		});

});

//thumbnails

app.get('/travelThumbnail', function(req, res, next) {
	var travel = JSON.parse(fs.readFileSync('json/travel.json'));
	res.render('blogpost', {
		blog: travel,
		type: "travel"
	});
});

app.get('/techThumbnail', function(req, res, next) {
	var tech = JSON.parse(fs.readFileSync('json/tech.json'));
	res.render('blogpost', {
		blog: tech,
		type: "tech"
	});
});

//blog post in page

app.get('/travel/blog/', function(req, res, next) {
	res.sendFile(__dirname + "/" + req.query.file)
});

app.get('/tech/blog/', function(req, res, next) {
	res.sendFile(__dirname + "/" + req.query.file)
});

// ask for blog pagepage
app.get('/:blogtype/:blogid', function(req, res, next) {
	if (req.params.blogtype === "tech") {
		var tech = JSON.parse(fs.readFileSync('json/tech.json'));
		for (var i = tech.length - 1; i >= 0; i--) {
			filename = tech[i].htmlfile.slice(17, -5);
			if (req.params.blogid === filename) {
				res.render('blogholder', {
					type: "tech",
					htmlfile: fs.readFileSync(tech[i].htmlfile)
				});
			}
		};
	}
	if (req.params.blogtype === "travel") {
		var travel = JSON.parse(fs.readFileSync('json/travel.json'));
		for (var i = travel.length - 1; i >= 0; i--) {
			filename = travel[i].htmlfile.slice(19, -5);
			if (req.params.blogid === filename) {
				res.render('blogholder', {
					type: "travel",
					htmlfile: fs.readFileSync(travel[i].htmlfile)
				});

			}
		};
	}
});

// start express
app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})