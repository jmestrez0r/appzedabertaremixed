<?php
	$data = json_decode(file_get_contents("php://input"));

	$host = "127.0.0.1";
	$user = "root";
	$pass = "esumamerda";
	$db = "mypocketcoach";

	$con = new mysqli($host, $user, $pass, $db);

	if($con->connect_error) {
		die("DB connection failed:" . $con->connect_error);
	}

	function utf8ize($d) {
    if (is_array($d))
        foreach ($d as $k => $v)
            $d[$k] = utf8ize($v);

     else if(is_object($d))
        foreach ($d as $k => $v)
            $d->$k = utf8ize($v);

     else
        return utf8_encode($d);

    return $d;
	}

?>
