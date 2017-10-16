<?php

	include('../config.php');

	$title = $data->title;
	$practiceDesc = $data->practiceDesc;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$type = $data->type;
	$volume = $data->volume;
	$intensity = $data->intensity;
	$density = $data->density;
	$frequency = $data->frequency;
	$playerId = $data->playerId;
	$playerXPosition = $data->playerXPosition;
	$playerYPosition = $data->playerYPosition;
	$playerZPosition = $data->playerZPosition;
	$eventId = $data->eventId;
	$teamId = $data->teamId;

	$sql = "INSERT INTO `PRACTICES`(`TITLE`, `PRACTICE_DESC`, `START_DATE`, `END_DATE`, `TYPE`,
		`VOLUME`, `INTENSITY`, `DENSITY`, `FREQUENCY`, `DESCRIPTION`, `PLAYER_ID`,
		`PLAYER_X_POSITION`, `PLAYER_Y_POSITION`, `PLAYER_Z_POSITION`, `TEAM_ID`, `EVENT_ID`)
		values ($title, $practiceDesc, $startDate, $endDate, $type,
			$volume, $intensity, $density, $frequency, $playerId,
			$playerXPosition, $playerYPosition, $playerZPosition, $eventId, $teamId)";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
