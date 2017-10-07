<?php

	include('config.php');


	$player_id = $data->player_id;
	$team_id = $data->team_id;
	$name = $data->name;
	$position = $data->position;
	$jerseyNumber = $data->jerseyNumber;
	$nationality = $data->nationality;
	$picture = $data->picture;
	$contractUntil = $data->contractUntil;
	$marketValue = $data->marketValue;

	$sql = "UPDATE `PLAYER`
		SET `NAME` = $name,
				`POSITION` = $position,
				`JERSEY_NUMBER` = $jerseyNumber,
				`NATIONALITY` = $nationality,
				`PICTURE` = $picture,
				`CONTRACT_UNTIL` = $contractUntil,
				`MARKET_VALUE` = $marketValue,
WHERE `TEAM_ID` = $team_id AND `PLAYER_ID` = $player_id";

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
