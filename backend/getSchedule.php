<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
@mysql_query("SET NAMES 'utf8'",$id);

require_once 'db.php'; // The mysql database connection script
$routeName = '%';
if(isset($_GET['route_name'])){
	$routeName = $_GET['route_name'];
}

$query="SELECT * FROM schedule JOIN location ON ".
"schedule.location_id = location.id ".
"and schedule.truck_route like '$routeName' ".
"and schedule.is_open = true ".
"order by schedule.day";

$result = $conn->query($query) or die($conn->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    	$arr[] = $rs;
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
$conn->close();

?>