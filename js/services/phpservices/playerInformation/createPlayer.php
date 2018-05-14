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
	$weight = $data->weight;
	$age = $data->age;

	if($contractUntil === '') {
		$contractUntil = NULL;
	}

	if($attributesId === '') {
		$sql = "INSERT INTO `PLAYER`(`TEAM_ID`, `NAME`, `AGE`, `POSITION`, `JERSEY_NUMBER`, `NATIONALITY`,
		 `PICTURE`, `CONTRACT_UNTIL`, `MARKET_VALUE`, `CREATION_DATE`, `UPDATE_DATE`, `WEIGHT`)
		values ('$teamId', '$name', '$age', '$position', '$jerseyNumber', '$nationality', '$picture', '$contractUntil',
			'$marketValue', NOW(), NOW(), '$weight')";
	} else {
		$sql = "INSERT INTO `PLAYER`(`TEAM_ID`, `NAME`, `AGE`, `POSITION`, `JERSEY_NUMBER`, `NATIONALITY`,
		 `PICTURE`, `CONTRACT_UNTIL`, `MARKET_VALUE`, `ATTRIBUTES_ID`, `CREATION_DATE`, `UPDATE_DATE`, `WEIGHT`)
		values ('$teamId', '$name', '$age', '$position', '$jerseyNumber', '$nationality', '$picture', '$contractUntil',
			'$marketValue', '$attributesId', NOW(), NOW(), '$weight')";
	}

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New player!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
