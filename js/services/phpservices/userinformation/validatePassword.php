<?php

	include('../config.php');

	$user = $data->user;
	$password = $data->password;

	$sql = "SELECT username, password
		FROM `USERS` WHERE `USERNAME` = '$user' AND `PASSWORD` = '$password'";
	$qry = mysqli_query($con, $sql);

	$data = array();

	if($qry->num_rows > 0) {
		while($row = $qry->fetch_object()) {
			$data[] = $row;
		}
	} else {
		$data[] = null;
	}

	$con->close();

	echo json_encode($data);

?>
