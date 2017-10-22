<?php

	include('../config.php');

	$teamId = $data->teamId;
	$startDate = $data->startDate;
	$endDate = $data->endDate;
	$type = $data->type;

	if($type === '') {
			$sql = "SELECT COUNT(1) as eventsThisWeek
				FROM `CALENDAR` WHERE `TEAM_ID` = '$teamId' AND `START_DATE` >= '$startDate'
					AND `START_DATE` <= '$endDate'";
	} else {
		$sql = "SELECT COUNT(1) as eventsThisWeek
			FROM `CALENDAR` WHERE `TEAM_ID` = '$teamId' AND `TYPE` = '$type' AND `START_DATE` >= '$startDate'
				AND `START_DATE` <= '$endDate'";
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

	echo json_encode(utf8ize($data));

?>
