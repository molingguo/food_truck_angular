
app.controller('MainController', 
	['$http', '$scope', '$filter', 'selectTimeFilter', 'selectGeneralFilter', function($http, $scope, $filter, selectTimeFilter, selectGeneralFilter) {
	//INITIALIZE
	$scope.appTitle = "Truck Tracker";
	$scope.appLocation = "Boston";
	$scope.splashText = "Maecenas tincidunt, augue et rutrum condimentum, libero lectus mattis orci, ut commodo. Augue et rutrum condimentum, libero lectus mattis orci, ut commodo.";
	$scope.searchPlaceholder = "What are you craving?";
	$scope.findFoodTitle = "Find Food";
	$scope.truckListTitle = "The Trucks";
	$scope.dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	$scope.timeOfDay = ["Breakfast", "Lunch", "Dinner", "Late Night"];
	$scope.foodtype = ["American", "Asian", "Burgers", "Dessert", "Drinks", "Healthy", "International", "Local", "Mexican", "Pizza", "Sandwiches"];
	$scope.neighborhood = ["Back Bay", "Cambridge", "Chinatown", "Downtown", "Fenway Kenmore", "Financial District", "South Boston", "South End", "West End"];
	$scope.truckFilter = [];
	$scope.mapCenter = mapCenter;
	$scope.mapListActive = true;
	$scope.isCollapsed = true;

	$scope.toTheTop = function() {
		$("html,body").animate({ scrollTop: 0 }, "slow");
    }

	$http.get("backend/getTruck.php").success(function(data){
		$scope.alltrucks = data;
	});

	$http.get("backend/getLocation.php").success(function(data) {
		$scope.markers = processMarkerMessage(data);
		$scope.allmarkers = data;
		$scope.markers_trucklist = processMarkerMessage(data);

		//TODO: move this to after view loads
		loadAllAnimations();
	});

	$scope.$watchCollection('[searchText, dayFilter, timeFilter, foodTypeFilter, neighborhoodFilter]', function(newValues, oldValues){
		filteredSearch = $filter('filter')($scope.allmarkers, newValues[0]);
		filteredDay = selectGeneralFilter(filteredSearch, "day", newValues[1]);
		filteredTime = selectTimeFilter(filteredDay, newValues[2]);
		filteredType = selectGeneralFilter(filteredTime, "food_type", newValues[3]);
		filteredNeighbor = selectGeneralFilter(filteredType, "neighborhood", newValues[4]);
		$scope.markers = processMarkerMessage(filteredNeighbor);
		$scope.markers_trucklist = processMarkerMessage(filteredNeighbor);
		//$scope.focusMarker();
	});

	$scope.selectTruck = function(truck) {
		if(_.contains($scope.truckFilter, truck.truck_route)) {
			$scope.truckFilter = _.without($scope.truckFilter, truck.truck_route);
		} else {
			$scope.truckFilter.push(truck.truck_route);
		}
		//console.log($scope.truckFilter);
		filteredTruck = selectGeneralFilter($scope.markers_trucklist, "truck_route", $scope.truckFilter);
		$scope.markers = processMarkerMessage(filteredTruck);
		
		$scope.focusMarker();
	}

	//if only one marker, focus and center it
	$scope.focusMarker = function() {
		if ($scope.markers.length == 1) {
			$scope.markers[0].focus = true;
			$scope.mapCenter.lat = $scope.markers[0].lat;
			$scope.mapCenter.lng = $scope.markers[0].lng-0.03;
		} else {
			_.map($scope.markers, function(marker) {
				marker.focus = false;
			})
			$scope.mapCenter = {lat: 42.356, lng: -71.121, zoom: 13};
		}
	}

	$scope.toggleMapList = function() {
		$scope.mapListActive = !$scope.mapListActive;
	}

	angular.extend($scope, {
		defaults: {
			tileLayer: "http://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}",
			zoomControlPosition: 'bottomright',
			tileLayerOptions: {
				//opacity: 0.9,
				detectRetina: true,
				reuseTiles: true,
				apikey: 'pk.eyJ1IjoibW9ybmluZzIxMzkiLCJhIjoiWWpJNloxOCJ9.mpb_pZ7JT8iNsaiu6OpZmA',
				mapid: 'morning2139.kdon049n'
			},
			scrollWheelZoom: false
		},
		markers: {},
		events: {
            map: {
                enable: ['click', 'mousemove'],
                logic: 'emit'
            }
        } 
	});

	// $scope.highlightMarkers = function(truck) {
	// 	_.mapObject($scope.markers, function(val, key) {
	// 		if (val.truck_route == truck.truck_route) {
	// 			val.icon.iconUrl = "img/truckicon_highlight.png";
	// 		} else {
	// 			val.icon.iconUrl = "img/truckicon.png";
	// 		}
	// 	});
	// }

	// //get current day and time and set up filters
	// $scope.setCurrentFilter = function() {
	// 	var currentdate = new Date();
	// 	var currentDay = currentdate.getDay();
	// 	var currentHour = currentdate.getHours();
	// 	var currentFilter = {};
	// 	currentFilter.day_of_week = dayOfWeek[currentDay-1];
	// 	if (currentHour <= 15) {
	// 		currentFilter.time_of_day = timeOfDay[1];
	// 	} else {
	// 		currentFilter.time_of_day = timeOfDay[2];
	// 	}
	// 	$scope.selectTruck = currentFilter;
	// }
}]);

var processMarkerMessage = function(inputMarkers) {
	var counters = {};
	inputMarkers = _.sortBy(inputMarkers, 'truck_route', 'day');

	result = _.map(inputMarkers, function(value) {
		processDay(value);
		counters[value.location_id] = counters[value.location_id] || "";
		var truckFormat = "<h2>" + value.truck_name + "</h2>";
		var scheduleFormat = "<h4>" + value.day_format + "&nbsp;&nbsp;&nbsp;" + value.open_time_format + "-" + value.close_time_format + "</h4>";

		//if message doesn't not contain the truck name, add to it, as well as the schedule
		if(counters[value.location_id].indexOf(value.truck_name) <= -1) {
			counters[value.location_id] = counters[value.location_id] + truckFormat;
			counters[value.location_id] = counters[value.location_id] + scheduleFormat;
		}

		//if contains the truck name, check if the schedule exists
		else {
			if (counters[value.location_id].indexOf(scheduleFormat) <= -1) {
				counters[value.location_id] = counters[value.location_id] + scheduleFormat;
			}
		}

		value.message = counters[value.location_id] + "<h5>" + value.location + "</h5>";
		return value;
	});
	//console.log("processMarkerMessage");
	//console.log(result);
	return result;
}
