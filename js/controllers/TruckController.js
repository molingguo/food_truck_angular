app.controller('TruckController', ['$http', '$scope', '$resource', '$routeParams', '$timeout', '$sce', 
	function($http, $scope, $resource, $routeParams, $timeout, $sce) {
		$scope.truckRoute = $routeParams.truckRoute;
		$scope.mapCenter = {lat: 42.356, lng: -71.08, zoom: 13};
		$scope.defaults = {
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
		};
		$scope.markers = {};
		$scope.allmarkers = {};
		$scope.showMap = true;

		//get truck basic information
		$http.get("backend/getTruck.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.truck = data[0];  //only one truck
			//console.log($scope.truck);
			if ($scope.truck.tweet) $scope.embedQuote();
			$timeout(function () { twttr.widgets.load(); }, 1000); 

			if ($scope.truck.instagram_iframe) {
				var instagram_embed_html = "<iframe src='"+$scope.truck.instagram_iframe+"' id='"+$scope.truck.instagram_id+"' name='"+$scope.truck.instagram_id+"'  scrolling='no' allowtransparency='true' class='instansive-widget' style='width: 100%; border: 0; overflow: hidden;'></iframe>";
				$scope.instagram_embed = $sce.trustAsHtml(instagram_embed_html);
			}
		});

		//get truck schedule
		$http.get("backend/getSchedule.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.schedule = data;
			processDays($scope.schedule);
			//console.log($scope.schedule);
			$scope.getCurrentSchedule();
			
			//TODO: move this to event after view is loaded
			truckAnimation();
		});

		//get truck menu
		$http.get("backend/getMenu.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.menu = data;
			//console.log($scope.menu);
		});

		//get truck location
		$http.get("backend/getLocation.php?route_name="+$scope.truckRoute).success(function(data) {
			if (data.length>0) {
				$scope.markers = processMarkerMessage(data);
				$scope.allmarkers = processMarkerMessage(data);
				$scope.truckMapToggle = 'Now';
				$scope.filterNow($scope.markers);
			} else {
				$scope.showMap = false;
			}
		});

		$scope.filterAll = function() {
			$scope.markers = $scope.allmarkers;
		}

		$scope.filterNow = function(markers) {
			var currentdate = new Date();
			var currentDay = currentdate.getDay();
			var currentHour = currentdate.getHours();
			var currentMin = currentdate.getMinutes();
			var currentTime = currentHour + currentMin/60;

			//set the day, 1-Mongday, 7-Sunday
			dayIndex = currentDay;
			if (dayIndex == 0) dayIndex = 7;

			var filterResults = _.filter(markers, function(marker) {
				var dayFilter = marker.day.indexOf(dayIndex.toString()) > -1;
				var timeFilter;

				if(!dayFilter) return false;

				if (marker.open_time && marker.close_time) {
					timeFilter = (Number(marker.open_time) <= currentTime && Number(marker.close_time) > currentTime);
				} else if (marker.time) {
					switch(marker.time) {
						case "Breakfast":
						timeFilter = currentTime < 10;
						break;
						case "Lunch":
						timeFilter = currentTime >= 10 && currentTime < 15;
						break;
						case "Dinner":
						timeFilter = currentTime >= 15 && currentTime < 21;
						break;
						default: 
						timeFilter = currentTime >= 21 && currentTime <= 23;
						break;
					}
				}
				return dayFilter && timeFilter;
			});
			$scope.markers = filterResults;
		}

		//TODO: Current Location: deal with multiple locations?
		$scope.getCurrentSchedule = function(schedulearray) {
			var currentdate = new Date();
			var currentDay = currentdate.getDay();
			var currentHour = currentdate.getHours();
			var currentMin = currentdate.getMinutes();
			var currentTime = currentHour + currentMin/60;

			//set the day, 1-Mongday, 7-Sunday
			dayIndex = currentDay;
			if (dayIndex == 0) dayIndex = 7;

			//filter to current day
			var filterResults = _.filter($scope.schedule, function(sche) {
				var dayFilter = sche.day.indexOf(dayIndex.toString()) > -1;
				var timeFilter;

				if(!dayFilter) return false;
				
				if (sche.open_time && sche.close_time) {
					timeFilter = (Number(sche.open_time) <= currentTime && Number(sche.close_time) > currentTime);
				} else if (sche.time) {
					switch(sche.time) {
						case "Breakfast":
							timeFilter = currentTime < 10;
							break;
						case "Lunch":
							timeFilter = currentTime >= 10 && currentTime < 15;
							break;
						case "Dinner":
							timeFilter = currentTime >= 15 && currentTime < 21;
							break;
						default: 
							timeFilter = currentTime >= 21 && currentTime <= 23;
							break;
					}
				}
				return dayFilter && timeFilter;
			});
			$scope.currentLocation = filterResults
		}

		var TwitterAPI = $resource("https://api.twitter.com/1/statuses/oembed.json",
    		{ callback: "JSON_CALLBACK" },
    		{ get: { method: "JSONP" }});

		$scope.embedQuote = function() {
			TwitterAPI.get({ 
				url: $scope.truck.tweet,
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
		}

		$scope.disableDefault = function() {
			if (angular.element(event.currentTarget).hasClass('disabled-link')) {
				event.preventDefault();
			}
		}
	}
]);