<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
@mysql_query("SET NAMES 'utf8'",$id);

require_once 'db.php'; // The mysql database connection script
$routeName = '%';
if(isset($_GET['route_name'])){
	$routeName = $_GET['route_name'];
}

$query="select truck.name, location.location, location.latitude, location.longitude from truck, schedule, location where
truck.route_name = schedule.truck_route
and location.id = schedule.location_id";

$result = $conn->query($query) or die($conn->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	$x = 1;
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		$nestedarray = array();
		$nestedarray['lat'] = (float)$rs[latitude];
		$nestedarray['lng'] = (float)$rs[longitude];
		$nestedarray['message'] = $rs[location];
		$nestedarray['icon'] = [ "iconUrl" => "img/truckicon.png", "iconAnchor" => [22, 5]];
		$marker = 'm'.$x;
    	$arr[$marker] = $nestedarray;
    	$x++;
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
//echo $arr;
$conn->close();

?>