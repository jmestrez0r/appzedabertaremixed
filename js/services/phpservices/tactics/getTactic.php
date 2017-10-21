<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;

	$sql = "SELECT T.TACTIC_ID as tacticId, T.DESCRIPTION as description,
			T.PLAYER_ID as playerId, P.NAME as name, P.POSITION as position,
			P.JERSEY_NUMBER as jerseyNumber,
			T.PLAYER_X_POSITION as topPosition,
			T.PLAYER_Y_POSITION as leftPosition,
			T.PLAYER_Z_POSITION as playerZPosition,
			T.TEAM_ID as teamId,
			T.EVENT_ID as eventId
		FROM `TACTICS` T
			INNER JOIN `PLAYER` P ON T.PLAYER_ID = P.PLAYER_ID
		WHERE T.TEAM_ID = '$teamId' AND T.EVENT_ID = '$eventId'";
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

	echo json_encode(utf8ize($data));

?>
