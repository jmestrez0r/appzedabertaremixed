<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;

	$sql = "SELECT TACTIC_ID as tacticId, DESCRIPTION as description, PLAYER_ID as playerId,
		PLAYER_X_POSITION as playerXPosition, PLAYER_Y_POSITION as playerYPosition,
		PLAYER_Z_POSITION as playerZPosition, TEAM_ID as teamId, EVENT_ID as eventId
		FROM `TACTICS` WHERE `TEAM_ID` = '$teamId' AND EVENT_ID = `$eventId`";
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

	echo json_encode(utf8ize($data));

?>
