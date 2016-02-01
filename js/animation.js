$(document).ready(function(){
  
});

var loadAllAnimations = function() {
  searchClear();
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

var truckAnimation = function() {
  $(".truck-illustration .large-truck").delay(1000).animate({left: '60%'}, 1500);
}