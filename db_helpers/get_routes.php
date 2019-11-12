<?php 
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Max-Age: 1000");
    
    header('content-type: application/json; charset=utf-8');

    require_once("db.php");

    $info;
    $query = 'SELECT * FROM routes_data ORDER BY submit_datetime';
    $result = pg_query($query) or die("Query failed: " . pg_last_error());

    while($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
        array_push($info, $line);
    }

    // Closing connection
    pg_close($db_conn);

    echo json_encode($info);



?>