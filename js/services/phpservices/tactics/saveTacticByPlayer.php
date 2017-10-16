<?php

	include('../config.php');

	$title = $data->title;
	$description = $data->description;
	$playerXPosition = $data->playerXPosition;
	$playerYPosition = $data->playerYPosition;
	$playerZPosition = $data->playerZPosition;
	$teamId = $data->teamId;
	$playerId = $data->playerId;
	$eventId = $data->eventId;

	$sql = "INSERT INTO `TACTICS`(`TITLE`,`DESCRIPTION`, `PLAYER_ID`,
		`PLAYER_X_POSITION`, `PLAYER_Y_POSITION`, `PLAYER_Z_POSITION`,
		`TEAM_ID`, `EVENT_ID`)
		values ($title, $description, $playerId,
			$playerXPosition, $playerYPosition, $playerZPosition,
			$team_id, $eventId)";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
