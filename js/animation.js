$(document).ready(function(){
  
});

var loadAllAnimations = function() {
  searchClear();
  truckAnimation();
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
  $(".truck-illustration .large-truck").delay(1000).animate({left: '52%'}, 1500);
}