<?php 
// LOCALHOST
$servername = "localhost";
$username = "root";
$password = "root";
$database = "foodtruck";

//SERVER
// $servername = "mysql.molingguo.com";
// $username = "foodtruck_user";
// $password = "741852963Gg";
// $database = "molingguo_foodtruck";

$conn = new mysqli($servername, $username, $password, $database);
$conn->set_charset('utf8'); 

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 
?>

