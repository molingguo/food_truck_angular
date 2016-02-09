app.controller('TruckController', ['$http', '$scope', '$routeParams', '$timeout', '$sce', 
	function($http, $scope, $routeParams, $timeout, $sce) {
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
		$scope.showMap = true;

		//get truck basic information
		$http.get("backend/getTruck.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.truck = data[0];  //only one truck
			//console.log($scope.truck);
			if ($scope.truck.tweet) $scope.embedQuote();
			$timeout(function () { twttr.widgets.load(); }, 1000); 
		});

		//get truck schedule
		$http.get("backend/getSchedule.php?route_name="+$scope.truckRoute).success(function(data) {
			$scope.schedule = data;
			processDays($scope.schedule);
			//console.log($scope.schedule);
			
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
			} else {
				$scope.showMap = false;
			}
		});

		//TODO: Current Location: deal with multiple locations?
		$scope.getCurrentSchedule = function(schedulearray) {
			var currentdate = new Date();
			var currentDay = currentdate.getDay();
			var currentHour = currentdate.getHours();

			//set the day
			dayIndex = currentDay-1;
			if (dayIndex == -1) dayIndex = 6;
		}

		$scope.embedQuote = function() {
			$http.get("https://api.twitter.com/1/statuses/oembed.json", {
				params: { 
					url: $scope.truck.tweet,
					hide_thread: true,
					hide_media: true,
					omit_script: true,
					align: 'center'
				}
			}).success(function(data) {
				var rawdata = data.html;
				rawdata = rawdata.replace(/<blockquote[^>]*>?/g, '');
				rawdata = rawdata.replace(/<\/blockquote>/g, '');
				$scope.twitter_embed = $sce.trustAsHtml(rawdata);
			});
		}
	}
]);