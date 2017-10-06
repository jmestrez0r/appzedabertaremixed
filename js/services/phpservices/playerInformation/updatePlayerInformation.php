<?php

	include('config.php');


	$team_id = $data->team_id;

	$sql = "SELECT * FROM `PLAYER` WHERE `TEAM_ID` = '$team_id'";

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
