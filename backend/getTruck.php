<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
@mysql_query("SET NAMES 'utf8'",$id);

require_once 'db.php'; // The mysql database connection script
$routeName = '%';
if(isset($_GET['route_name'])){
	$routeName = $_GET['route_name'];
} 

$query_foodtype = "select * from food_type";
$result_foodtype = $conn->query($query_foodtype) or die($conn->error.__LINE__);
$foodtypes = array();
if($result_foodtype->num_rows > 0) {
	while($rs = $result_foodtype->fetch_array(MYSQLI_ASSOC)) {
    	$foodtypes[$rs[type_name]] = $rs[icon];
	}
}

$query="select *, group_concat(tf.type_name separator ',') as food_type FROM truck 
INNER JOIN trucks_foodtypes as tf
	on tf.route_name = truck.route_name
	and truck.route_name like '$routeName'
	group by truck.route_name 
order by truck.name";

$result = $conn->query($query) or die($conn->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

		if ($rs[food_type]) {
			$arr2 = array();
			$foodtypestring = $rs[food_type];
			$foodtypearray = explode(",", $foodtypestring);

			foreach ($foodtypearray as $foodtype) {
				$arr2[] = array("typename" => $foodtype, "typeicon" => $foodtypes[$foodtype]);
			}
			$rs[food_type] = $arr2;
		} 
		$arr[] = $rs;
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
$conn->close();

?>