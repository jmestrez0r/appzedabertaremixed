<?php

	include('../config.php');

	$teamId = $data->teamId;

	$sql = "SELECT T.TACTIC_ID as tacticId, T.DESCRIPTION as description,
			T.PLAYER_ID as playerId, P.NAME as name, P.POSITION as position, P.NATIONALITY as nationality,
			P.JERSEY_NUMBER as jerseyNumber,
			T.PLAYER_X_POSITION as topPosition,
			T.PLAYER_Y_POSITION as leftPosition,
			T.PLAYER_Z_POSITION as playerZPosition,
			T.TEAM_ID as teamId,
			T.EVENT_ID as eventId
		FROM `TACTICS` T
						INNER JOIN `PLAYER` P ON T.PLAYER_ID = P.PLAYER_ID
						INNER JOIN (
							SELECT * FROM `CALENDAR` C
							where C.START_DATE > NOW() and C.TEAM_ID = '$teamId'
							limit 1
						) C ON T.EVENT_ID = C.EVENT_ID
		WHERE T.TEAM_ID = '$teamId'
		ORDER BY P.NAME ASC";
	$qry = mysqli_query($con, $sql);

	$data = array();

	if($qry->num_rows) {
	 	if($qry->num_rows > 0) {
			while($row = $qry->fetch_object()) {
				$data[] = $row;
			}
		} else {
			$data[] = null;
		}
	}

	$con->close();

	echo json_encode($data);

?>
