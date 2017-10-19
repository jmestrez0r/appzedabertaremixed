<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventTitle = $data->eventTitle;
	$eventType = $data->eventType;
	$startDate = $data->startDate;
	$endDate = $data->endDate;

	$sql = "INSERT INTO `CALENDAR`(`TITLE`, `TYPE`, `START_DATE`, `END_DATE`, `TEAM_ID`)
		values ('$eventTitle', '$eventType', '$startDate', '$endDate', $teamId)";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
