<?php
    $db_conn = pg_connect("host=localhost dbname=kevincj1_runmap user=kevincj1_cesium133 password=cartopasswordlingo123")
        or die("Could not connect: " . pg_last_error());

?>