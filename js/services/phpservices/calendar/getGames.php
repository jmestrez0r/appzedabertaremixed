<?php

	include('../config.php');

	$teamId = $data->teamId;

	$sql = "SELECT EVENT_ID as eventId, TITLE as title, TYPE as type,
		START_DATE as startDate, END_DATE as endDate
		FROM `CALENDAR` WHERE `TEAM_ID` = '$teamId' and `TYPE` = 'game'";
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
