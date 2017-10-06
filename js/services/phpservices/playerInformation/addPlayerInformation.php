<?php

	include('../config.php');


	$team_id = $data->team_id;

	$sql = "";
	$sql2 = "INSERT INTO PLAYER(PLAYER_ID, TEAM_ID, NAME, POSITION, JERSEY_NUMBER, NATIONALITY) values (1001, 57, 'José Amador', 'Treinador', 00, 'Portuguese')";

	$qry = mysqli_query($con, $sql);
	$qry2 = mysqli_query($con, $sql);

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
