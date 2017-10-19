<?php

	include('../config.php');

	$practiceId = $data->practiceId;
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


	$sql = "UPDATE `PRACTICES`
		SET `TITLE` = $title,
		SET `PRACTICE_DESC` = $practiceDesc,
		SET `TYPE` = $type,
		SET `START_DATE` = $startDate,
		SET `END_DATE` = $endDate,
		SET `TEAM_ID` = $teamId,
		SET `PLAYER_X_POSITION` = $playerXPosition,
		SET `PLAYER_Y_POSITION` = $playerYPosition,
		SET `PLAYER_Z_POSITION` = $playerZPosition,
		SET `VOLUME` = $volume,
		SET `INTENSITY` = $intensity,
		SET `DENSITY` = $density,
		SET `FREQUENCY` = $frequency
		WHERE `EVENT_ID` = $eventId AND `TEAM_ID` = $teamId AND
			`PRACTICE_ID` = $practiceId AND `PLAYER_ID` = $playerId;

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
