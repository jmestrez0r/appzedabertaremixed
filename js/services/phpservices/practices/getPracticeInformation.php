<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;

	$sql = "SELECT PR.PRACTICE_ID as practiceId, PR.TITLE as title, PR.PRACTICE_DESC as practiceDescription,
		PR.START_DATE as startDate, PR.TYPE as type, PR.VOLUME as volume, PR.INTENSITY as intensity,
		PR.DENSITY as density, PR.FREQUENCY as frequency, PR.DESCRIPTION as description,
		PR.PLAYER_ID as playerId, PL.JERSEY_NUMBER as jerseyNumber, PL.NAME as name,
		PR.PLAYER_X_POSITION as topPosition, PR.PLAYER_Y_POSITION as leftPosition,
		PR.PLAYER_Z_POSITION as playerZPosition, PR.TEAM_ID as teamId, PR.EVENT_ID as eventId,
		PR.FIELD_LOCATION as selectedField, PR.FIELD_HEIGHT as height, PR.FIELD_WEIGHT as weight
		FROM `PRACTICES` PR
			INNER JOIN PLAYER PL ON PR.PLAYER_ID = PL.PLAYER_ID
		WHERE PR.TEAM_ID = '$teamId' AND PR.EVENT_ID = $eventId";
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
