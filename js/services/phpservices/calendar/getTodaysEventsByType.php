<?php

	include('../config.php');

	$teamId = $data->teamId;
	$type = $data->type;

	$sql = "SELECT EVENT_ID as eventId, TITLE as title, TYPE as type,
		START_DATE as startDate, END_DATE as endDate
		FROM `CALENDAR` WHERE `TEAM_ID` = '$teamId' AND `TYPE` = '$type'
			AND `START_DATE` > NOW() AND `START_DATE` <= DATE_ADD(NOW(), INTERVAL 1 DAY)";
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
