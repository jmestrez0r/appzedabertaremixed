<?php

	include('../config.php');

	$eventId = $data->eventId;
	$teamId = $data->teamId;
	$eventTitle = $data->eventTitle;
	$eventType = $data->eventType;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$defineColor = $data->defineColor;

	$sql = "UPDATE `CALENDAR`
		SET `TITLE` = $eventTitle,
		SET `TYPE` = $eventType,
		SET `START_DATE` = $startDate,
		SET `END_DATE` = $endDate,
		SET `TEAM_ID` = $teamId
		SET `UPDATE_DATE` = NOW()
		WHERE `EVENT_ID` = $eventId";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
