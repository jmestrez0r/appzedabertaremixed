<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventTitle = $data->eventTitle;
	$defineUrl = $data->defineUrl;
	$eventType = $data->eventType;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$defineColor = $data->defineColor;

	$sql = "INSERT INTO `EVENT`(`TITLE`,`DEFINE_URL`, `TYPE`, `START_DATE`, `END_DATE`, `TEAM_ID`,
		`DEFINE_COLOR`)
		values ($eventTitle, $defineUrl, $eventType, $startDate, $endDate, $teamId, $defineColor)";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
