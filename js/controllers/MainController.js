
app.controller('MainController', ['$http', '$scope', '$filter', function($http, $scope, $filter) {
	//INITIALIZE
	$scope.appTitle = "Truck Tracker";
	$scope.appLocation = "Boston";
	$scope.splashText = "Maecenas tincidunt, augue et rutrum condimentum, libero lectus mattis orci, ut commodo. Augue et rutrum condimentum, libero lectus mattis orci, ut commodo.";
	$scope.searchPlaceholder = "What are you craving?";
	$scope.findFoodTitle = "Find Food";
	$scope.truckListTitle = "The Trucks";
	$scope.dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	$scope.timeOfDay = ["Breakfast", "Lunch", "Dinner", "Late Night"];
	$scope.foodtype = ["American", "Asian", "Mexican", "Desserts", "Drinks", "Vegetarian"];
	$scope.neighborhood = ["Back Bay", "West End", "Downtown", "Financial District", "Fenway", "NEU", "BU", "Harvard", "Innovation District", "North End"];

	$http.get("backend/getTruck.php").success(function(data){
		$scope.alltrucks = data;
	});

	$http.get("backend/getLocation.php").success(function(data) {
		console.log(data);
		$scope.markers = data;
		$scope.markers2 = $scope.markers;
		//console.log($scope.trucks);

		//TODO: move this to after view loads
		loadAllAnimations();
	});

	$scope.$watch('searchText', function(val) { 
		$scope.markers = $filter('filter')($scope.markers2, val);
	});

	angular.extend($scope, {
		boston: {
			lat: 42.356,
			lng: -71.121,
			zoom: 13
		},
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

	$scope.highlightMarkers = function(truck) {

		_.mapObject($scope.markers, function(val, key) {
			if (val.truck_route == truck.truck_route) {
				val.icon.iconUrl = "img/truckicon_highlight.png";
			} else {
				val.icon.iconUrl = "img/truckicon.png";
			}
		});
	}

	// $scope.restoreMarkers = function(truck) {
	// 	_.mapObject(truck.markers, function(val, key) {
	// 		val.icon.iconUrl = "img/truckicon.png";
	// 	});
	// }

	// $scope.addMarkers = function(markers) {
	// 	angular.extend($scope, {
	// 		markers: markers
	// 	});
	// };

	// $http.get('food-truck-api/http.php').success(function(data) {
	// 	var allTrucks = data.food_trucks;
	// 	$scope.trucks = allTrucks;
	// 	$scope.setCurrentFilter();
	// });
	
	// $scope.dayOfWeekOrder = function(item) {
	// 	return dayOfWeek.indexOf(item.day_of_week);
	// };

	// $scope.timeOfDayOrder = function(item) {
	// 	return timeOfDay.indexOf(item.time_of_day);
	// };

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
