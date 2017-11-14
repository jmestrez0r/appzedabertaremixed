<?php

	include('../config.php');

	$teamId = $data->teamId;
	$startDate = $data->startDate;
	$endDate = $data->endDate;

	$sql = "SELECT distinct(PR.EVENT_ID) as exercise,
		PR.START_DATE as startDate, PR.TYPE as type, PR.VOLUME as volume, PR.INTENSITY as intensity,
		PR.DENSITY as density, PR.FREQUENCY as frequency, PR.DESCRIPTION as description
		FROM `PRACTICES` PR
		WHERE PR.TEAM_ID = $teamId AND PR.START_DATE >= '$startDate' AND PR.START_DATE <= '$endDate'";
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
