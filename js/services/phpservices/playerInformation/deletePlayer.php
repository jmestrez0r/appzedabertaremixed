<?php

	include('../config.php');


	$teamId = $data->teamId;
	$playerId = $data->playerId;
	$attributesId = $data->attributesId;

	$sqlAtt = "DELETE FROM `ATTRIBUTES` WHERE `ATTRIBUTES_ID` = $attributesId";
	$sql = "DELETE FROM `PLAYER` WHERE `TEAM_ID` = $teamId AND
		`PLAYER_ID` = $playerId";

	$qry2 = mysqli_query($con, $sql);

	if($qry2 === TRUE) {
		echo "Deleted Player";
	} else {
		echo "Error: " . $qry2 . "<br>" . $con->error;
	}

	$qry = mysqli_query($con, $sqlAtt);

	if($qry === TRUE) {
		echo "Deleted Attribute";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
