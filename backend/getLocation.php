<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
@mysql_query("SET NAMES 'utf8'",$id);

require_once 'db.php'; // The mysql database connection script
$routeName = '%';
if(isset($_GET['route_name'])){
	$routeName = $_GET['route_name'];
}

$query="select truck.name, truck.route_name, truck.food_type, location.id, location.location, location.latitude, location.longitude, open_time, close_time from truck, schedule, location where
truck.route_name = schedule.truck_route 
and location.id = schedule.location_id 
order by truck.route_name";

$query_truck = "select truck_route, count(*) as count from schedule join truck
where schedule.truck_route = truck.route_name
group by truck_route";

$result_truck = $conn->query($query_truck) or die($conn->error.__LINE__);
$result = $conn->query($query) or die($conn->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	while($rs = $result_truck->fetch_array(MYSQLI_ASSOC)) {
		$truckcount = $rs[count];
		$truckroute = $rs[truck_route];
		
		for ($x = 0; $x < $truckcount; $x++) {
			$rs2 = $result->fetch_array(MYSQLI_ASSOC);
		    $nestedarray = array();
		    // $nestedarray['group'] = $rs2[id];
		    $nestedarray['truck_name'] = $rs2[name];
		    $nestedarray['truck_route'] = $rs2[route_name];
		    $nestedarray['food_type'] = $rs2[food_type];
			$nestedarray['lat'] = (float)$rs2[latitude];
			$nestedarray['lng'] = (float)$rs2[longitude];
			$nestedarray['message'] = $rs2[location];
			$nestedarray['open_time'] = (float)$rs2[open_time];
			$nestedarray['close_time'] = (float)$rs2[close_time];
			$nestedarray['focus'] = false;
			$nestedarray['icon'] = [ "iconUrl" => "img/truckicon.png", "iconAnchor" => [22, 5]];
			$marker = $truckroute.$x;
			$arr[$marker] = $nestedarray;
		}
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
//echo $arr;
$conn->close();

?>