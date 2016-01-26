$(document).ready(function(){
  
});

var loadAllAnimations = function() {
  searchClear();
  maplistAnimation();
  truckAnimation();

  $('.toggle-truck-list').click(function () {
    if ($('.toggle-truck-list span').hasClass('glyphicon-chevron-down')) {
      $('.toggle-truck-list h2').html('View Less<span class="glyphicon glyphicon-chevron-up toggle-carets"></span>'); 
    } else {      
      $('.toggle-truck-list h2').html('View More<span class="glyphicon glyphicon-chevron-down toggle-carets"></span>'); 
    }
  }); 
}

var searchClear = function() {
  $(".search-truck").keyup(function(){
    $("#searchclear").toggle(Boolean($(this).val()));
  });
  $("#searchclear").toggle(Boolean($("#searchinput").val()));
  $("#searchclear").click(function(){
    $(".search-truck").val('').focus();
    $(this).hide();
  });
}

var maplistAnimation = function() {
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
}

var truckAnimation = function() {
  $(".truck-illustration .large-truck").delay(1000).animate({left: '60%'}, 1500);
}