<?php

	include('../config.php');


	$teamId = $data->teamId;
	$name = $data->name;
	$position = $data->position;
	$jerseyNumber = $data->jerseyNumber;
	$nationality = $data->nationality;
	$picture = $data->picture;
	$contractUntil = $data->contractUntil;
	$marketValue = $data->marketValue;
	$attributesId = $data->attributesId;

	if($contractUntil === '') {
		$contractUntil = NULL;
	}

	$sql = "INSERT INTO `PLAYER`(`TEAM_ID`, `NAME`, `POSITION`, `JERSEY_NUMBER`, `NATIONALITY`,
		 `PICTURE`, `CONTRACT_UNTIL`, `MARKET_VALUE`, `ATTRIBUTES_ID`)
		values ('$teamId', '$name', '$position', '$jerseyNumber', '$nationality', '$picture', '$contractUntil',
			'$marketValue', '$attributesId')";

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New player!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
