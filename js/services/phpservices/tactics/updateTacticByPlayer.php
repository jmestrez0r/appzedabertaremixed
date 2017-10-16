<?php

	include('../config.php');

	$tacticId = $data->tacticId;
	$title = $data->title;
	$description = $data->description;
	$playerXPosition = $data->playerXPosition;
	$playerYPosition = $data->playerYPosition;
	$playerZPosition = $data->playerZPosition;
	$teamId = $data->teamId;
	$playerId = $data->playerId;
	$eventId = $data->eventId;

	$sql = "UPDATE `TACTICS`
		SET `TITLE` = $title,
		SET `DESCRIPTION` = $description,
		SET `PLAYER_X_POSITION` = $playerXPosition,
		SET `PLAYER_Y_POSITION` = $playerYPosition,
		SET `PLAYER_Z_POSITION` = $playerZPosition
	WHERE `TEAM_ID` = '$teamId' AND EVENT_ID = `$eventId` AND
	PLAYER_ID = $playerId AND TACTIC_ID = $tacticId";

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
