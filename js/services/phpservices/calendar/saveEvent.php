<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventTitle = $data->eventTitle;
	$eventType = $data->eventType;
	$startDate = $data->startDate;
	$endDate = $data->endDate;

	$startDate = str_replace('T', ' ', $startDate);
	$startDate = str_replace('.000Z', '', $startDate);

	if($endDate === '') {
		$endDate = NULL;
	} else {
		$endDate = str_replace('T', ' ', $endDate);
		$endDate = str_replace('.000Z', '', $endDate);
	}

	if($endDate === NULL) {
		$sql = "INSERT INTO `CALENDAR`(`TITLE`, `TYPE`, `START_DATE`,  `TEAM_ID`, `CREATION_DATE`, `UPDATE_DATE`)
				values ('$eventTitle', '$eventType', '$startDate', '$teamId', NOW(), NOW())";
	} else {
		$sql = "INSERT INTO `CALENDAR`(`TITLE`, `TYPE`, `START_DATE`, `END_DATE`, `TEAM_ID`, `CREATION_DATE`, `UPDATE_DATE`)
				values ('$eventTitle', '$eventType', '$startDate', '$endDate', '$teamId', NOW(), NOW())";
	}

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

		$con->close();
?>
