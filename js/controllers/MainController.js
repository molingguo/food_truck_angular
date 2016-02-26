
app.controller('MainController', 
	['$http', '$scope', '$resource', '$filter', '$timeout', '$sce', 'selectTimeFilter', 'selectGeneralFilter', function($http, $scope, $resource, $filter, $timeout, $sce, selectTimeFilter, selectGeneralFilter) {
	//INITIALIZE
	$scope.appTitle = "Hungry Hunter";
	$scope.appLocation = "Boston";
	$scope.splashText = "Maecenas tincidunt, augue et rutrum condimentum, libero lectus mattis orci, ut commodo. Augue et rutrum condimentum, libero lectus mattis orci, ut commodo.";
	$scope.searchPlaceholder = "Search for Trucks";
	$scope.findFoodTitle = "Find Food";
	$scope.truckListTitle = "The Trucks";
	$scope.noResultText = "No results match your search"
	$scope.dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	$scope.timeOfDay = timeOfDay;
	$scope.foodtype = ["American", "Asian", "Burgers", "Dessert", "Drinks", "Healthy", "International", "Local", "Mexican", "Pizza", "Sandwiches"];
	$scope.neighborhood = ["Back Bay", "Cambridge", "Chinatown", "Downtown", "Fenway Kenmore", "Financial District", "South Boston", "South End", "West End"];
	$scope.truckFilter = [];
	$scope.tooltipNearMe = "requires your permission to get your location";
	$scope.mapCenter = mapCenter;
	$scope.mapListActive = true;
	$scope.isCollapsed = true;
	$scope.featured_id = "655557534334455808";

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

		//set default filter to be now
		$scope.filterNow();

		//TODO: move this to after view loads
		loadAllAnimations();
		$timeout(function () { twttr.widgets.load(); }, 1000); 
		$scope.embedQuote();
	});

	$scope.$watchCollection('[dayFilter, timeFilter, foodTypeFilter, neighborhoodFilter]', function(newValues, oldValues){
		//filteredSearch = $filter('filter')($scope.allmarkers, newValues[0]);
		filteredDay = selectGeneralFilter($scope.allmarkers, "day", newValues[0]);
		filteredTime = selectTimeFilter(filteredDay, newValues[1]);
		filteredType = selectGeneralFilter(filteredTime, "food_type", newValues[2]);
		filteredNeighbor = selectGeneralFilter(filteredType, "neighborhood", newValues[3]);
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
		
		//$scope.focusMarker();
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

	$scope.filterNow = function() {
		var currentdate = new Date();
		var currentDay = currentdate.getDay();
		var currentHour = currentdate.getHours();

		//set the day
		dayIndex = currentDay-1;
		if (dayIndex == -1) dayIndex = 6;
		$scope.dayFilter = [dayOfWeek[dayIndex]];

		//set the time
		if (currentHour < 10) {
			$scope.timeFilter = [timeOfDay[0]];
		}
		else if (currentHour < 15) {
			$scope.timeFilter = [timeOfDay[1]];
		}
		else if (currentHour <= 19) {
			$scope.timeFilter = [timeOfDay[2]];
		} else {
			$scope.timeFilter = [timeOfDay[3]];
		}
	}

	$scope.filterNearMe = function() {
		var autoDiscover = true;
		$scope.mapCenter = {autoDiscover: true};
		$scope.mapCenter.zoom = 15;
		angular.element('.neighborhood-filter').removeClass('open');

		//TODO: add dot to current location
		// $scope.$watch('mapCenter.autoDiscover', function() {
		// 	if ($scope.mapCenter.autoDiscover===false) {
		// 		$scope.markers.push({
		// 			lat: $scope.mapCenter.lat,
		// 			lng: $scope.mapCenter.lng,
		// 			focus: false,
		// 			message: null,
		// 			icon: {
		// 				iconUrl: "img/selfmarker.png",
		// 				iconAnchor: [15, 15]
		// 			}
		// 		});
		// 		console.log($scope.mapCenter.lat);
		// 		console.log($scope.mapCenter.lng);
		// 	}
		// });
	}

	$scope.clearFilters = function() {
		$scope.dayFilter = [];
		$scope.timeFilter = [];
		$scope.foodTypeFilter = [];
		$scope.neighborhoodFilter = [];
		$scope.truckFilter = [];
		$scope.mapCenter = mapCenter;
	}

	var TwitterAPI = $resource("https://api.twitter.com/1/statuses/oembed.json",
    		{ callback: "JSON_CALLBACK" },
    		{ get: { method: "JSONP" }});

	$scope.embedQuote = function() {
    	TwitterAPI.get({ 
    		url: 'https://twitter.com/melissakpalardy/status/598534759418089472',
    		hide_thread: true,
			hide_media: true,
			omit_script: true,
			align: 'center'
		}, function(data) {
			var rawdata = data.html;
			rawdata = rawdata.replace(/<blockquote[^>]*>?/g, '');
			rawdata = rawdata.replace(/<\/blockquote>/g, '');
			$scope.twitter_embed = $sce.trustAsHtml(rawdata);
		});
  	};
}]);
