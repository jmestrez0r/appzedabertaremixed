<?php

	include('config.php');


	$team_id = $data->team_id;
	$player_id = $data->player_id;
	$attributesId = $data->attributesId;

	$sqlAtt = "DELETE FROM `ATTRIBUTES` WHERE `ATTRIBUTES_ID` = $attributesId";
	$sql = "DELETE FROM `PLAYER` WHERE `TEAM_ID` = $team_id AND
		`PLAYER_ID` = $player_id";

	$qry = mysqli_query($con, $sqlAtt);
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
