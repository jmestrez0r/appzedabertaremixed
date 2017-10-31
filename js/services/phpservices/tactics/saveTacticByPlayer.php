<?php

	include('../config.php');

	$description = $data->description;
	$playerXPosition = $data->topPosition;
	$playerYPosition = $data->leftPosition;
	$teamId = $data->teamId;
	$playerId = $data->playerId;
	$eventId = $data->eventId;

	$sql = "INSERT INTO `TACTICS`(`DESCRIPTION`, `PLAYER_ID`,
		`PLAYER_X_POSITION`, `PLAYER_Y_POSITION`, `PLAYER_Z_POSITION`,
		`TEAM_ID`, `EVENT_ID`, `CREATION_DATE`, `UPDATE_DATE`)
		values ('$description', '$playerId', '$playerXPosition', '$playerYPosition', '0', '$teamId', '$eventId', NOW(), NOW())";

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
