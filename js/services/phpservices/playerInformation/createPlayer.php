<?php

	include('../config.php');


	$team_id = $data->team_id;
	$name = $data->name;
	$position = $data->position;
	$jerseyNumber = $data->jerseyNumber;
	$nationality = $data->nationality;
	$picture = $data->picture;
	$contractUntil = $data->contractUntil;
	$marketValue = $data->marketValue;
	$attributesId = $data->attributesId;

	$sql = "INSERT INTO `PLAYER`(TEAM_ID`, `NAME`, `POSITION`, `JERSEY_NUMBER`, `NATIONALITY`, `PICTURE`, `CONTRACT_UNTIL,
		 MARKET_VALUE`, `ATTRIBUTES_ID)
		values ($team_id , $name, $position, $jerseyNumber, $nationality, $picture, $contractUntil,
			$marketValue, $attributesId)";

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

	echo json_encode($data);

?>
