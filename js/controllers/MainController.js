
app.controller('MainController', ['$http', '$scope', function($http, $scope) {
	//INITIALIZE
	$scope.appTitle = "Truck Tracker";
	$scope.appLocation = "Boston";
	$scope.splashText = "Maecenas tincidunt, augue et rutrum condimentum, libero lectus mattis orci, ut commodo. Augue et rutrum condimentum, libero lectus mattis orci, ut commodo.";
	$scope.searchPlaceholder = "What are you craving?";
	$scope.findFoodTitle = "Find Food";
	$scope.truckListTitle = "The Trucks";
	
	$http.get("backend/getTruck.php").success(function(data){
		$scope.trucks = data;
		console.log($scope.trucks);
		loadMap();
	});

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
