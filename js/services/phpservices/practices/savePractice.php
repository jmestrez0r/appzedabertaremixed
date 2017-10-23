<?php

	include('../config.php');

	$title = $data->title;
	$practiceDesc = $data->exercise;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$type = $data->type;
	$volume = $data->volume;
	$intensity = $data->intensity;
	$density = $data->density;
	$frequency = $data->frequency;
	$description = $data->description;
	$playerId = $data->playerId;
	$playerXPosition = $data->topPosition;
	$playerYPosition = $data->leftPosition;
	$eventId = $data->eventId;
	$teamId = $data->teamId;
	$fieldLocation = $data->fieldLocation;
	$fieldHeight = $data->fieldHeight;
	$fieldWeight = $data->fieldWeight;

	$sql = "INSERT INTO `PRACTICES`(`TITLE`, `PRACTICE_DESC`, `START_DATE`, `END_DATE`, `TYPE`,
		`VOLUME`, `INTENSITY`, `DENSITY`, `FREQUENCY`, `DESCRIPTION`, `PLAYER_ID`, `DESCRIPTION`
		`PLAYER_X_POSITION`, `PLAYER_Y_POSITION`, `PLAYER_Z_POSITION`, `TEAM_ID`, `EVENT_ID`,
		`FIELD_LOCATION`, `FIELD_HEIGHT`, `FIELD_WEIGHT`)
		values ($title, $practiceDesc, $startDate, $endDate, $type,
			$volume, $intensity, $density, $frequency, $playerId, $description,
			$playerXPosition, $playerYPosition, '0', $teamId, $eventId,
			$fieldLocation, $fieldHeight, $fieldWeight)";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
