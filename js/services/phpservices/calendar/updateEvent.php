<?php

	include('../config.php');

	$eventId = $data->eventId;
	$teamId = $data->teamId;
	$eventTitle = $data->eventTitle;
	$defineUrl = $data->defineUrl;
	$eventType = $data->eventType;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$defineColor = $data->defineColor;

	$sql = "UPDATE `EVENT`
		SET `TITLE` = $eventTitle,
		SET `DEFINE_URL` = $defineUrl,
		SET `TYPE` = $eventType,
		SET `START_DATE` = $startDate,
		SET `END_DATE` = $endDate,
		SET `TEAM_ID` = $teamId,
		SET `DEFINE_COLOR` = $defineColor
		WHERE `EVENT_ID` = $eventId";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
