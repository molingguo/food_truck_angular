
//Global CONSTANTS
var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayOfWeekShort = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
var timeOfDay = ["Breadfast", "Lunch", "Dinner"];

var app = angular.module('foodTruck',['ngRoute', 'leaflet-directive', 'nya.bootstrap.select', 'angular-underscore']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
      }).
      when('/:truckRoute', {
        templateUrl: 'partials/truck.html',
        controller: 'TruckController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


// app.filter('filterTime', function() {
// 	return function(truck, timeArray) {
// 		if (truck.markers)
// 	}
// })
// function makeSameHeight() {
// 	  //make responsive grid same height in row
// 	  var heights = $(".menu-list").map(function() {
// 	  	return $(this).height();
// 	  }).get(),

// 	  maxHeight = Math.max.apply(null, heights);
// 	  console.log(maxHeight);

// 	  $(".menu-list").height(maxHeight);
// 	}

	// app.controller('foodTruckController', ['$http', '$scope', function($http, $scope) {
	// 	//INITIALIZE
	// 	$scope.trucks = [];

	// 	$http.get('food-truck-api/http.php').success(function(data) {
	// 		var allTrucks = data.food_trucks;
	// 		$scope.trucks = allTrucks;
	// 		$scope.setCurrentFilter();
	// 	});
		
	// 	$scope.dayOfWeekOrder = function(item) {
 //   			return dayOfWeek.indexOf(item.day_of_week);
	// 	};

	// 	$scope.timeOfDayOrder = function(item) {
 //   			return timeOfDay.indexOf(item.time_of_day);
	// 	};

	// 	//get current day and time and set up filters
	// 	$scope.setCurrentFilter = function() {
	// 		var currentdate = new Date();
	// 		var currentDay = currentdate.getDay();
	// 		var currentHour = currentdate.getHours();
	// 		var currentFilter = {};
	// 		currentFilter.day_of_week = dayOfWeek[currentDay-1];
	// 		if (currentHour <= 15) {
	// 			currentFilter.time_of_day = timeOfDay[1];
	// 		} else {
	// 			currentFilter.time_of_day = timeOfDay[2];
	// 		}
	// 		$scope.selectTruck = currentFilter;
	// 	}
	// }]);

	// app.filter('unique', function() {
	// 	return function (arr, field) {
	// 		return _.uniq(arr, function(a) { return a[field]; });
	// 	};
	// });

	// app.controller('logoController', ['$http', '$scope', function($http, $scope) {
	// 	var backendfile = "/backend/backend.php";
	// 	//backendfile = "/foodtrucks" + backendfile;
		
	// 	$http.get(backendfile).success(function(data) {
	// 		$scope.logos = data.records;
	// 		//console.log($scope.logos);
	// 	});
	//}]);