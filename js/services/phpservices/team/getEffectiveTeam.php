<?php

	include('../config.php');

	$teamId = $data->teamId;

		$sql = "SELECT TEAM_ID as teamId, NAME as name, SHORTNAME as shortName, DESCRIPTION as description,
		CRESTURL as crestUrl
		FROM `TEAM` WHERE `TEAM_ID` = '$teamId'";

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


	echo json_encode(utf8ize($data));

?>
