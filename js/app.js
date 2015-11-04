
//Global CONSTANTS
var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var timeOfDay = ["Breadfast", "Lunch", "Dinner"];

(function() {
	var app = angular.module('foodTruck',[]);

	app.controller('foodTruckController', ['$http', '$scope', function($http, $scope) {
		//INITIALIZE
		$scope.trucks = [];

		$http.get('food-truck-api/http.php').success(function(data) {
			var allTrucks = data.food_trucks;
			$scope.trucks = allTrucks;
			$scope.setCurrentFilter();
		});
		
		$scope.dayOfWeekOrder = function(item) {
   			return dayOfWeek.indexOf(item.day_of_week);
		};

		$scope.timeOfDayOrder = function(item) {
   			return timeOfDay.indexOf(item.time_of_day);
		};

		//get current day and time and set up filters
		$scope.setCurrentFilter = function() {
			var currentdate = new Date();
			var currentDay = currentdate.getDay();
			var currentHour = currentdate.getHours();
			var currentFilter = {};
			currentFilter.day_of_week = dayOfWeek[currentDay-1];
			if (currentHour <= 15) {
				currentFilter.time_of_day = timeOfDay[1];
			} else {
				currentFilter.time_of_day = timeOfDay[2];
			}
			$scope.selectTruck = currentFilter;
		}
	}]);

	app.filter('unique', function() {
		return function (arr, field) {
			return _.uniq(arr, function(a) { return a[field]; });
		};
	});

	app.controller('logoController', ['$http', '$scope', function($http, $scope) {
		var backendfile = "/backend/backend.php";
		//backendfile = "/foodtrucks" + backendfile;
		
		$http.get(backendfile).success(function(data) {
			$scope.logos = data.records;
			//console.log($scope.logos);
		});
	}]);
})();