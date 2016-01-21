$(document).ready(function(){

	// map-list toggle animation
	$(".map-wrapper .map-list .toggle-list").on( "click", function() {
  		
  		var $mapList = $(this).closest('.map-list');
  		var $mapListButton = $(this).find('.toggle-list-button');
  		if ($mapList.hasClass('active')) {
  			$mapListButton.removeClass("glyphicon-circle-arrow-left");
  			$mapListButton.addClass("glyphicon-circle-arrow-right");
  		} else {
  			$mapListButton.removeClass("glyphicon-circle-arrow-right");
  			$mapListButton.addClass("glyphicon-circle-arrow-left");
  		}

  		$mapList.toggleClass('active');

	});
});

var truckAnimation = function() {
  $(".truck-illustration .large-truck").delay(1000).animate({left: '60%'}, 1500);
}