<?php

	include('../config.php');

	$teamId = $data->teamId;

	$sql = "SELECT PLAYER_ID as playerId, TEAM_ID as teamId, NAME as name, POSITION as position,
		JERSEY_NUMBER as jerseyNumber, NATIONALITY as nationality, PICTURE as pictureBlob,
		CONTRACT_UNTIL as contractUntil, MARKET_VALUE as marketValue, ATTRIBUTES_ID as attributesId
		FROM `PLAYER` WHERE `TEAM_ID` = '$teamId'";
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
