<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;
	$startDate = $data->startDate;

	$sql = "SELECT PRACTICE_ID as practiceId, TITLE as title, PRACTICE_DESC as practiceDescription,
		START_DATE as startDate, TYPE as type, VOLUME as volume, INTENSITY as intensity,
		DENSITY as density, FREQUENCY as frequency, DESCRIPTION as description,
		PLAYER_ID as playerId, PLAYER_X_POSITION as playerXPosition, PLAYER_Y_POSITION as playerYPosition,
		PLAYER_Z_POSITION as playerZPosition, TEAM_ID as teamId, EVENT_ID as eventId
		FROM `PRACTICES` WHERE `TEAM_ID` = '$teamId' AND `START_DATE` > '$startDate'";
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
