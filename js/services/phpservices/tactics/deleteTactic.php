<?php

	include('../config.php');

	$eventId = $data->eventId;
	$teamId = $data->teamId;

	$sql = "DELETE FROM `TACTICS`
		WHERE `EVENT_ID` = $eventId AND `TEAM_ID` = $teamId";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Deleted record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
