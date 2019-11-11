<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Max-Age: 1000");

header('content-type: application/json; charset=utf-8');

require_once("db.php");

// $info = array();
// $error_code = null;
// $desc = ""; 

$routeType = $_POST['routeType'];
$scenicRating  = $_POST['scenicRating'];
$overallRating = $_POST['overallRating'];
$paved = $_POST['paved'];
$elevationRating = $_POST['elevationRating'];
$notes = $_POST['notes'];
$routeLength = $_POST['routeLength'];
$routeJSON = $_POST['routeJSON'];
$datetime = date("M d, Y h:i A");

// finish rest of php script here
/*
if routejson field is not empty, execute db connection
show error messages. refer to langData.php to see how postgres does it
*/
// echo $routeJSON;

// if (!empty($routeJSON)) {
//     echo "<h2>Your route has been submitted! </h2>";
//     echo "<p><strong>Route type: </strong>{$routeType}</p><br>";
//     echo "<p><strong>Route Length: </strong>{$routeLength}</p><br>";
//     echo "<p><strong>Elevation: </strong>{$elevationRating}</p><br>";
//     echo "<p><strong>Scenic Rating: </strong>{$scenicRating}</p><br>";
//     echo "<p><strong>Paved?: </strong>{$paved}</p><br>";
//     echo "<p><strong>Notes: </strong>{$notes}</p><br>";
//     echo "<p><strong>Date Submitted: </strong>{$datetime}</p><br>";


// } else {
//     echo "Because of issues with the drawn route, your data couldn't be submitted. Please try again. ";
// }

$executeQuery = pg_query($insertQuery);

// Error message if data cannot be inserted into table
if (!$executeQuery) {
    echo "<p>Error: failed to insert data! Please try again. </p>";
}

$insertQuery = "INSERT INTO routes_data(routeType, scenicRating, elevationRating, paved, overallRating, notes, routeJson, routeLength, submit_datetime) 
VALUES ('$routeType','$scenicRating','$elevationRating','$paved','$overallRating','$notes', '$routeJSON','$routeLength','$datetime')";


// Closing connection
pg_close($db_conn);

?>