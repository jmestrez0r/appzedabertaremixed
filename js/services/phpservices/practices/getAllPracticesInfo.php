<?php

	include('../config.php');

	$teamId = $data->teamId;

	$sql = "SELECT distinct(PR.EVENT_ID) as eventId, PR.PRACTICE_DESC as practiceDesc, PR.TYPE as type, PR.VOLUME as volume, PR.INTENSITY as intensity,
		PR.DENSITY as density, PR.FREQUENCY as frequency, PR.DESCRIPTION as description, PR.START_DATE as startDate
		FROM `PRACTICES` PR
		WHERE PR.TEAM_ID = '$teamId'
		order by PR.START_DATE DESC";

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
