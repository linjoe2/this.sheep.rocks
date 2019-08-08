let YouTube = require('simple-youtube-api');
let dir = require('node-dir');
let fs = require('fs')
let totalObject = []

const youtube = new YouTube('HiddenKey');


//empty array's
fs.writeFileSync("json/maps.json",'[]');
fs.writeFileSync("json/tech.json",'[]');
fs.writeFileSync("json/travel.json",'[]');



function eatPlaylist(playlistID) {
	youtube.getPlaylistByID(playlistID)
	.then(results => {
	results.getVideos().then (Vresults => {
		//console.log(results)
		for(i=0 ; i < Vresults.length ; i++){
			let data
			let geo = false
			let title = Vresults[i].title
			let id = Vresults[i].id
			let description = Vresults[i].description
			let thumbnail = Vresults[i].thumbnails.medium.url
			let date = new Date(Vresults[i].publishedAt)
			date = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()
			if(results.title === 'Travel'){
				if(description.toLowerCase().includes('geo:')){
					geo = description.substring(
  					  description.lastIndexOf("eo:") + 3, 
					  description.lastIndexOf(";")
					);
					description = description.replace('geo:'+geo+';','');

				}
				data = {title: title,date: date, id: id, description: description, thumbnail: thumbnail, geo: geo, type: 'travel'}
				if(data.geo != false) {
					mapify(data)
				}
			}else {
				data = {title: title,date: date, id: id, description: description, thumbnail: thumbnail, geo: geo, type: 'tech'}
			}
			youtubeify(data)
			jsonify(data)

		}
		save(results.title,totalObject)
		totalObject = []
	})
		


 })
.catch(console.error);
}


 

function youtubeify(data) {
	html = '<div id="video"><iframe id="videoplayer" src="https://www.youtube.com/embed/'+data.id+'"></iframe></div><div id="content"><h1>'+data.title+'</h1><br><p>'+data.description+'</p></div><script>$("#videoplayer, #content").css("height",$(window).height());</script>'
	htmlfile = "static/html/" + data.type + '/' + data.id + ".html"
	fs.writeFileSync(htmlfile, html);
}

function mapify(data) {
	let object = {title: data.title, location: data.geo, htmlfile: 'static/html/travel/'+data.id+'.html'}
	fs.readFile('json/maps.json', (err, data) => {
		if (err) throw err;
                      var file = JSON.parse(data)
		      file.push(object)
		      fs.writeFileSync("json/maps.json",JSON.stringify(file));
	});
}


function jsonify(data) {
	let object = {title: data.title,date: data.date,image: data.thumbnail,summary: data.description,htmlfile: 'static/html/'+data.type+'/'+data.id+'.html' }
	totalObject.push(object)
}

function save(type,totalObject) {
	file = 'json/'+type.toLowerCase()+'.json'
	console.log(file)
	console.log(totalObject)
	data = JSON.stringify(totalObject)
	fs.writeFileSync(file,data)
}


//travel
 eatPlaylist('PLWAlFvp8hUppCU1lhf-LvQx5jE2tHP_hs')
//tech
 eatPlaylist('PLWAlFvp8hUppMcvgfGjPATErTGXZ6iij7')
