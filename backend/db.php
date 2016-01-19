<?php 
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
$conn->set_charset('utf8'); 

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 
?>

