<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
@mysql_query("SET NAMES 'utf8'",$id);

require_once 'db.php'; // The mysql database connection script
$routeName = '%';
if(isset($_GET['route_name'])){
	$routeName = $_GET['route_name'];
} else {
	die("Connection failed: No route_name provided");
}

//get type name and count (might be null)
$query1 = "select menu_type.name, count(*) as count from menu_item, menu_type where ".
"menu_item.type_id = menu_type.id ".
"and menu_item.truck_route like '$routeName' ".
"group by menu_item.type_id ".
"order by menu_type.order";

//No Menu Type -- just get all menu items
$query2 = "select name, description, price from menu_item where ".
"menu_item.truck_route like '$routeName' ";

//Has Menu Type -- get all menu items and type
$query3 = "select menu_item.name, menu_item.description, ".
"menu_item.price from menu_item join menu_type where ".
"menu_item.type_id = menu_type.id ".
"and menu_item.truck_route like '$routeName' ".
"order by menu_type.order";

$result = $conn->query($query1) or die($conn->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	$result2 = $conn->query($query3) or die($conn->error.__LINE__);

	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		$typename = $rs[name];
		$typecount = $rs[count];
		$nestedarray = array();

		for ($x = 0; $x < $typecount; $x++) {
			$rs2 = $result2->fetch_array(MYSQLI_ASSOC);
			$nestedarray[] = $rs2;
		}
		$arr2 = array();
		$arr2["type_name"] = $typename;
    	$arr2["menu_item"] = $nestedarray;
    	$arr[] = $arr2;
	}
} 
else {
	// no menu type
	$result = $conn->query($query2) or die($conn->error.__LINE__);
	$arr2 = array();
	$nestedarray = array();
	$arr2["type_name"] = NULL;
	if($result->num_rows > 0) {
		while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
			$nestedarray[] = $rs;
		}
	}
	$arr2["menu_item"] = $nestedarray;
	$arr[] = $arr2;
}

# JSON-encode the response
echo $json_response = json_encode($arr);
$conn->close();

?>