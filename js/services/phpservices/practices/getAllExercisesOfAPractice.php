<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;

	$sql = "SELECT distinct(PR.PRACTICE_DESC) as exercise
		FROM `PRACTICES` PR
		WHERE PR.TEAM_ID = '$teamId' AND PR.EVENT_ID = '$eventId'";

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
