$(document).ready(function() {

	//map
	$('#map').css('height', $(window).height() + 25);
	$('#now').css('height', $(window).height() / 2);
	$('#travel, #tech,#techBlog, #travelBlog').css('height', $(window).height());
	//interactief menu
	$("#travel,#tech, #now, #techBlog, #travelBlog, .menuButton").hide();
	$("#travelMenu, #techMenu, #nowMenu").show();

	//sheep
	$('#logo').click(function() {
		rotation();
	});

	//blog posts
	$('.travel').click(function() {
		$("#travelBlog.content").show("slide", {
			direction: "down"
		}, 10);
		$("#travelBlog").show("slide", {
			direction: "down"
		}, 400);;
	});

	$('.tech').click(function() {
		$("#techBlog.content").show("slide", {
			direction: "down"
		}, 10);
		$("#techBlog").show("slide", {
			direction: "down"
		}, 400);;
	});

	function openBlog() {
		console.log('test')
	}

	$('.exit').click(function() {
		history.pushState(null, null, '/');
		$("#techBlog").hide("slide", {
			direction: "down"
		}, 400);
		$("#travelBlog").hide("slide", {
			direction: "down"
		}, 400)
		setTimeout(function() {
			$("#travelBlog.content, #techBlog.content").empty();
		}, 400);
	});


	//mobile menu
	$('.exitMenu').click(function() {
		$("#menu, #now").hide("slide", {
			direction: "up"
		}, 400);
		$(".menuButton").show("slide", {
			direction: "up"
		}, 400);
	});

	$('.menuButton').click(function() {
		$(".menuButton").hide("slide", {
			direction: "up"
		}, 400);
		$("#menu").show("slide", {
			direction: "up"
		}, 400);
	});

	$('.exitTech').click(function() {
		$("#tech").hide("slide", {
			direction: "right"
		}, 400);
	});
	$('.exitTravel').click(function() {
		$("#travel").hide("slide", {
			direction: "left"
		}, 400);
	});

//sheep logo functions
	var rotation = function() {
		$("#logo").rotate({
			angle: 0,
			animateTo: 360,
		});
	}

// # request url
	$(function() {
		if (document.location.href.indexOf('#tech') > -1) {
			if (techLoaded == 0) {
				$.get("/techThumbnail", function(res) {
					$('.tech').append("<p>" + res + "</p>");
				});
				techLoaded = 1
			};
			$("#tech").toggle("slide", {
				direction: "right"
			}, 750);
		}
	});
		$(function() {
		if (document.location.href.indexOf('#travel') > -1) {
			if (travelLoaded == 0) {
				$.get("/travelThumbnail", function(res) {
					$('.travel').append("<p>" + res + "</p>");
				});
				travelLoaded = 1
			};
			$("#travel").toggle("slide", {
				direction: "left"
			}, 750);
		}
	});
		$(function() {
		if (document.location.href.indexOf('#now') > -1) {
			$("#now").slideToggle(500);
		}
	});


});



//resize jquery
$(window).resize(function() {
	$('#map').css('height', $(window).height() + 25);
	$('#now').css('height', $(window).height() / 2);
	$('#travel, #tech,#techBlog, #travelBlog').css('height', $(window).height());
});