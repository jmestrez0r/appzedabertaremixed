<?php

	include('../config.php');

	$eventId = $data->eventId;

	$sql = "DELETE FROM `PRACTICES`
		WHERE `EVENT_ID` = $eventId";
	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Deleted record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
