<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// LOCALHOST
$servername = "localhost";
$username = "root";
$password = "root";
$database = "foodtruck";

//SERVER
// $servername = "localhost";
// $username = "molinggu_ftuser";
// $password = "p(#T7^7[S~V2";
// $database = "molinggu_foodtruck";


$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$result = $conn->query("SELECT name, logo FROM truck");

$outp = "";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["name"] . '",';
    $outp .= '"Logo":"'. $rs["logo"]     . '"}'; 
}

$outp ='{"records":['.$outp.']}';
$conn->close();

echo $outp;
?>