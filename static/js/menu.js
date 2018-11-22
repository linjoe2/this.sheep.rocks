			//menu
			var travelLoaded = 0
			$('#travelMenu').click(function() {
				if (travelLoaded == 0) {
					$.get("/travelThumbnail", function(res) {
						$('.travel').append("<p>" + res + "</p>");
						});
					travelLoaded = 1
				};
				$("#travel").toggle("slide", {
					direction: "left"
				}, 500);
			});

			var techLoaded = 0
			$('#techMenu').click(function() {
				if (techLoaded == 0) {
					$.get("/techThumbnail", function(res) {
						$('.tech').append("<p>" + res + "</p>");
						});
					techLoaded = 1
				};
				$("#tech").toggle("slide", {
					direction: "right"
				}, 500);
			});
			$('#nowMenu').click(function() {
				$("#now").slideToggle(500);
			});
			$('#mapMenu').click(function() {
				$("#now").hide("slide", {
					direction: "up"
				}, 500);
				$("#travel").hide("slide", {
					direction: "left"
				}, 500);
				$("#tech").hide("slide", {
					direction: "right"
				}, 500);
			});
