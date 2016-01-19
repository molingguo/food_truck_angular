app.controller('TruckController', ['$http', '$scope', '$routeParams', 
	function($http, $scope, $routeParams) {
		$scope.truckRoute = $routeParams.truckRoute;

		//get truck basic information
		$http.get("backend/getTruck.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.truck = data[0];  //only one truck
			console.log($scope.truck);
		});

		//get truck schedule
		$http.get("backend/getSchedule.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.schedule = data;
			processDays($scope.schedule);
			console.log($scope.schedule);
			
			//TODO: move this to event after view is loaded
			loadMap();
			truckAnimation();
		});

		//get truck menu
		$http.get("backend/getMenu.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.menu = data;
			console.log($scope.menu);
		});
	}
]);

//convert number into actual day of week
var processDays = function(scheduleArray) {
	for (i = 0; i < scheduleArray.length; i++) {
		//format time
		if (scheduleArray[i].open_time && scheduleArray[i].close_time) {
			scheduleArray[i].open_time = processTime(scheduleArray[i].open_time);
			scheduleArray[i].close_time = processTime(scheduleArray[i].close_time);
		}

		if (scheduleArray[i].day.length > 1) {
			//convert string to array split by comma
			splitArray = scheduleArray[i].day.split(",");
			
			if (splitArray.length > 3 && checkInRow(splitArray)) {
				scheduleArray[i].day = dayOfWeekShort[Number(splitArray[0])-1] + " – " + dayOfWeekShort[Number(splitArray[splitArray.length-1])-1];
			} else {
				scheduleArray[i].day = _.map(splitArray, function(day) {return dayOfWeekShort[Number(day)-1]}).join(", ");
			}
		} else {
			scheduleArray[i].day = dayOfWeek[Number(scheduleArray[i].day)-1];
		}
	}
}

var processTime = function(timeString) {
	time = Number(timeString);
	result = "";

	if (time > 12) {
		time = time - 12;
	}

	if (time == parseInt(time)) {
		result = time;
	} else {
		result = Math.floor(time) + ":" + (time - Math.floor(time))*60;
	}
	return result;
}

var checkInRow = function(numberArray) {
	return (numberArray[numberArray.length-1] - numberArray[0]) == (numberArray.length - 1);
}

// var processPrice = function(numberString) {
// 	return Number(numberString);
// }