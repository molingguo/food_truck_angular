
//Global CONSTANTS
var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayOfWeekShort = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
var timeOfDay = ["Breadfast", "Lunch", "Dinner", "Late Night"];
var mapCenter = {lat: 42.356, lng: -71.121, zoom: 13};

var app = angular.module('foodTruck',['ngRoute', 'leaflet-directive', 'ui.bootstrap', 'ngAnimate', 'nya.bootstrap.select', 'angular-underscore', 'duScroll']);

app.config(['$routeProvider', '$logProvider', 
  function($routeProvider, $logProvider) {
  	//TODO: turn it on later, maybe?
  	$logProvider.debugEnabled(false);

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


app.filter('selectTime', function() {
	return function(input, timeArray) {
		//console.log(input);
		var out = [];

		timeArray = timeArray || [];
		if(timeArray.length == 0) return input;

		for (i = 0; i < timeArray.length; i++) {
			switch(timeArray[i]) {
				case 'Breakfast':
					out = out.concat(filterTimeHelper(input, 10, 1));
					break;
				case 'Lunch':
					out = out.concat(filterTimeHelper(input, 15, 10));
					break;
				case 'Dinner':
					out = out.concat(filterTimeHelper(input, 24, 17));
					break;
				case 'Late Night':
					out = out.concat(filterTimeHelper(input, 24, 21));
					break;
				default:
					break;
			}
		}
		//console.log("selectTime - Output");
		//console.log(out);
		return out;
	}
})

function filterTimeHelper(markers, opentime, closetime) {
	var result = [];

	_.each(markers, function(marker) {
		if ((marker.open_time <= opentime) && (marker.close_time >= closetime)) {
			result.push(marker);
		}
	})

	return result;
}

app.filter('selectGeneral', function() {
	return function(inputArray, filtertype, filterArray) {
		var out = [];

		filterArray = filterArray || [];
		if (filterArray.length == 0) return inputArray;

		_.each(filterArray, function(afilter) {

			//filter day case
			if (filtertype == "day") {
				target = (dayOfWeek.indexOf(afilter)+1).toString();
			} 
			else {
				target = afilter;
			}

			_.each(inputArray, function(input) {
				if (input[filtertype].indexOf(target) > -1) {
					out.push(input);
				}
			})
		})
		//console.log("selectGeneral - "+filtertype+" - Output");
		//console.log(out);
		return out;
	}
})

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

//convert number into actual day of week
var processDays = function(scheduleArray) {
	for (i = 0; i < scheduleArray.length; i++) {
		processDay(scheduleArray[i]);
	}
}

var processDay = function(schedule) {
	//format time
	if (schedule.open_time && schedule.close_time) {
		schedule['time_format'] = processTime(schedule.open_time) + " – " + processTime(schedule.close_time);
	} else {
		schedule['time_format'] = schedule['time'];
	}

	if (schedule.day.length > 1) {
		//convert string to array split by comma
		splitArray = schedule.day.split(",");
		
		if (splitArray.length > 3 && checkInRow(splitArray)) {
			schedule['day_format'] = dayOfWeekShort[Number(splitArray[0])-1] + " – " + dayOfWeekShort[Number(splitArray[splitArray.length-1])-1];
		} else {
			schedule['day_format'] = _.map(splitArray, function(day) {return dayOfWeekShort[Number(day)-1]}).join(", ");
		}
	} else {
		schedule['day_format'] = dayOfWeek[Number(schedule.day)-1];
	}
}

var processTime = function(timeString) {
	time = Number(timeString);
	result = "";
	am = "AM";

	if (time > 12) {
		time = time - 12;
		am = "PM";
	}

	if (time == parseInt(time)) {
		result = time;
	} else {
		result = Math.floor(time) + ":" + (time - Math.floor(time))*60;
	}
	return result+am;
}

var checkInRow = function(numberArray) {
	return (numberArray[numberArray.length-1] - numberArray[0]) == (numberArray.length - 1);
}

var processMarkerMessage = function(inputMarkers) {
	var counters = {};
	inputMarkers = _.sortBy(inputMarkers, 'truck_route', 'day');

	result = _.map(inputMarkers, function(value) {
		processDay(value);
		counters[value.location_id] = counters[value.location_id] || "";
		var truckFormat = "<h2><a href='#/" + value.truck_route + "'>" + value.truck_name + "</a></h2>";
		var scheduleFormat = "<h4>" + value.day_format + "&nbsp;&nbsp;&nbsp;" + value.time_format + "</h4>";

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