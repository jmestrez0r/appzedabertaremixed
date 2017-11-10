<?php

	include('../config.php');

	$teamId = $data->teamId;
	$eventId = $data->eventId;
	$exercise = $data->$exercise;

	$sql = "DELETE FROM `PRACTICES`
		WHERE `EVENT_ID` = $eventId AND `TEAM_ID` = $teamId AND `PRACTICE_DESC` = '$exercise'"
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Deleted record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
