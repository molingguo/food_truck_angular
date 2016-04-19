$(document).ready(function(){
  
});

var loadAllAnimations = function() {
  searchClear();
  truckAnimation();
  splashAnimation();
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

var splashAnimation = function() {
  var topTrucks = $(".splash-image .splash-image-up .splash-trucks");
  var btTrucks = $(".splash-image .splash-image-bt .splash-trucks");
  for (i = 0; i < topTrucks.length; i++) {
    var rand = Math.random();
    var rand2 = Math.random();
    $(topTrucks[i]).delay(rand2*2000).animate({right: ((4-i)*15+17)+'%'}, 2000 + rand * 3000 + (4-i)*200);
  }

  for (i = 0; i < btTrucks.length; i++) {
    var rand = Math.random();
    var rand2 = Math.random();
    $(btTrucks[i]).delay(rand2*2000).animate({left: (i*15+3)+'%'}, 2000 + rand * 3000 + i*200);
  }
}