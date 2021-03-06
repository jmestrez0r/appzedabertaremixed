<?php

	include('../config.php');

	$eventId = $data->eventId;
	$teamId = $data->teamId;
	$title = $data->title;
	$practiceDesc = $data->exercise;
	$startDate = $data->startDate;
	$type = $data->type;
	$volume = $data->volume;
	$intensity = $data->intensity;
	$density = $data->density;
	$frequency = $data->frequency;
	$description = $data->description;
	$playerId = $data->playerId;
	$playerXPosition = $data->topPosition;
	$playerYPosition = $data->leftPosition;
	$fieldLocation = $data->fieldLocation;
	$fieldHeight = $data->fieldHeight;
	$fieldWeight = $data->fieldWeight;
	$iconId = $data->iconId;
	$iconXPosition = $data->iconTopPosition;
	$iconYPosition = $data->iconLeftPosition;

	if($playerId === '') {
		$sql = "INSERT INTO `PRACTICES`(`TITLE`, `PRACTICE_DESC`, `START_DATE`, `TYPE`, `VOLUME`, `INTENSITY`,
			`DENSITY`, `FREQUENCY`, `DESCRIPTION`, `TEAM_ID`, `EVENT_ID`, `FIELD_LOCATION`, `FIELD_HEIGHT`, `FIELD_WEIGHT`,
			`OBJECT_ICON_ID`, `OBJECT_X_POSITION`, `OBJECT_Y_POSITION`, `OBJECT_Z_POSITION`, `CREATION_DATE`, `UPDATE_DATE`)
			values ('$title', '$practiceDesc', '$startDate', '$type', '$volume', '$intensity',
				'$density', '$frequency', '$description', '$teamId', '$eventId', '$fieldLocation',
				'$fieldHeight', '$fieldWeight',
				'$iconId', '$iconXPosition', '$iconYPosition', '0', NOW(), NOW())";
	} else {
		$sql = "INSERT INTO `PRACTICES`(`TITLE`, `PRACTICE_DESC`, `START_DATE`, `TYPE`, `VOLUME`, `INTENSITY`,
			`DENSITY`, `FREQUENCY`, `DESCRIPTION`, `PLAYER_ID`, `PLAYER_X_POSITION`, `PLAYER_Y_POSITION`,
			`PLAYER_Z_POSITION`, `TEAM_ID`, `EVENT_ID`, `FIELD_LOCATION`, `FIELD_HEIGHT`, `FIELD_WEIGHT`,
			`OBJECT_ICON_ID`, `OBJECT_X_POSITION`, `OBJECT_Y_POSITION`, `OBJECT_Z_POSITION`, `CREATION_DATE`, `UPDATE_DATE`)
			values ('$title', '$practiceDesc', '$startDate', '$type', '$volume', '$intensity',
				'$density', '$frequency', '$description', '$playerId', '$playerXPosition', '$playerYPosition',
				'0', '$teamId', '$eventId', '$fieldLocation', '$fieldHeight', '$fieldWeight',
				'$iconId', '$iconXPosition', '$iconYPosition', '0', NOW(), NOW())";
	}

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
