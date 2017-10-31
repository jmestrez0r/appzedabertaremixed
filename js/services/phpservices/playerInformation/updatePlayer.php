<?php

	include('../config.php');


	$playerId = $data->playerId;
	$teamId = $data->teamId;
	$name = $data->name;
	$position = $data->position;
	$jerseyNumber = $data->jerseyNumber;
	$nationality = $data->nationality;
	$picture = $data->picture;
	$contractUntil = $data->contractUntil;
	$marketValue = $data->marketValue;
	$age = $data->age;

	$sql = "UPDATE `PLAYER`
		SET `NAME` = '$name',
				`POSITION` = '$position',
				`JERSEY_NUMBER` = '$jerseyNumber',
				`NATIONALITY` = '$nationality',
				`AGE` = '$age',
				`PICTURE` = '$picture',
				`CONTRACT_UNTIL` = '$contractUntil',
				`MARKET_VALUE` = '$marketValue'
				WHERE `TEAM_ID` = $teamId AND `PLAYER_ID` = $playerId";

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated player";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
