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

	$data = array();

	if($endDate === NULL) {
		$sql = "SELECT EVENT_ID as eventId FROM `CALENDAR`
			WHERE `TITLE` = '$eventTitle' AND `TYPE` = '$eventType'
			AND `START_DATE` = '$startDate'
			AND `TEAM_ID` = '$teamId'";
	} else {
		$sql = "SELECT EVENT_ID as eventId FROM `CALENDAR`
			WHERE `TITLE` = '$eventTitle' AND `TYPE` = '$eventType'
			AND `START_DATE` = '$startDate'
			AND `END_DATE` = '$endDate'
			AND `TEAM_ID` = '$teamId'";
	}

	$qry = mysqli_query($con, $sql);

	$data = array();

	if($qry->num_rows > 0) {
		while($row = $qry->fetch_object()) {
			$data[] = $row;
		}
	} else {
		$data[] = null;
	}

	$con->close();

	echo json_encode($data);

?>
