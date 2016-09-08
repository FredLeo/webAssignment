var places_service;
var geocoder;
var location_latlng;
var map;
var _list = [];
var place;

// google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
	places_service = new google.maps.places.PlacesService(document.getElementById("attribution"));
	geocoder = new google.maps.Geocoder();
	//initialize geocoder
	map = new google.maps.Map(document.getElementById('map'), {//instantiate map
		center : {
			lat : -41,
			lng : 174
		}, //make sure the New Zealand map is at the center
		zoom : 6	//shows the all map
	});
}

function updateMarker(locl) {
	//var myCenter=new google.maps.LatLng(-41.0221,174.31545);
	var marker = new google.maps.Marker({
		position : locl,
		map : map,
		animation : google.maps.Animation.BOUNCE
	});

	map.setZoom(15);
	map.setCenter(marker.getPosition());

	google.maps.event.addListener(marker, 'click', function() {
		map.setZoom(17);
		map.setCenter(marker.getPosition());
	});
}

var icon = {
	url : "../res/sit_marron.png", // url
	scaledSize : new google.maps.Size(50, 50), // scaled size
	origin : new google.maps.Point(0, 0), // origin
	anchor : new google.maps.Point(0, 0) // anchor
};

//get town and zoom in town on map
function geocode() {
	place = document.getElementById("place").value;
	var geocode_request = {
		address : place,
		region : "NZ"
	}

	geocoder.geocode(geocode_request, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			document.getElementById("results").innerHTML = "";
			location_latlng = results[0].geometry.location;
			//get location
			updateMap(location_latlng);
			//upate map
			addTown();
			//add town object to list
			townLine();
			//create a marker on map with place name
			var marker = new google.maps.Marker({
				position : location_latlng,
				map : map,
				draggable : false,
				title : place,
				icon : {
					url : "imgs/fg.png", // url
					scaledSize : new google.maps.Size(50, 50), // scaled size
					origin : new google.maps.Point(0, 0), // origin
					anchor : new google.maps.Point(0, 0) // anchor
				}
			});
			//create infomation window
			var infowindow = new google.maps.InfoWindow({
				content : place
			});
			//open window on marker
			infowindow.open(map, marker);
			//when user clicks it, zoom in
			google.maps.event.addListener(marker, 'click', function() {
				map.setZoom(15);
				map.setCenter(marker.getPosition());
			});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

//search bussiness names
function search() {
	interest = document.getElementById("interest").value;
	$.getJSON("php/exploreNZphp.php?lat=" + location_latlng.lat() + "&lon=" + location_latlng.lng() + "&name=" + interest, displayResults);
}

//display business
displayResults = function(data) {
	var results = data.results;
	var searchResults = document.getElementById("results");
	searchResults.innerHTML = "";
	$.each(results, function(index, entry) {//generate the business list
		searchResults.innerHTML += "<a href='Javascript:void(0);' onclick='updateMarker(" + JSON.stringify(entry["geometry"]["location"]) + ")'>" + entry["name"] + " " + entry["vicinity"] + "</a><br />";
	});
}
//upate map passing location as paremeter to the method
function updateMap(location) {
	document.getElementById("results").innerHTML = "";
	map = new google.maps.Map(document.getElementById('map'), {
		center : location,
		zoom : 12
	});
}

//add town to list
function addTown() {
	var town = {//town object used to hold town
		name : place,
		loca : location_latlng
	};
	
	var found=false;
	$.each(_list,function(index,entry){
		if(entry["name"]==place){
				found=true;
		}			
	});
	
	if (!found)
		_list.push(town);
}

//generate ui
function townLine() {
	var listUI = document.getElementById("towns");
	listUI.innerHTML = "";
	function create_ui() {//create all the town names with onclick function
		for (var key in _list) {
			listUI.innerHTML += "<a href='Javascript:void(0);' onclick='updateMap(" + JSON.stringify(_list[key].loca) + ")'>" + _list[key]["name"] + "</a><br>";
		}
	}

	create_ui();
}

//add listener
google.maps.event.addDomListener(window, 'load', initialize);
