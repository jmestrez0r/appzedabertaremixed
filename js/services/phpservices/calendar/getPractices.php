<?php

	include('../config.php');

	$teamId = $data->teamId;
	$startDate = $data->startDate;
	$endDate = $data->endDate;

	$sql = "SELECT DISTINCT(C.EVENT_ID) as eventId, P.TITLE as title,
			P.PRACTICE_DESC as description, P.TYPE as type,
			C.START_DATE as startDate, C.END_DATE as endDate
		FROM `CALENDAR` C INNER JOIN `PRACTICES` P ON C.EVENT_ID = P.EVENT_ID
		WHERE C.TEAM_ID = '$teamId' and C.TYPE = 'practice'
			AND C.START_DATE > '$startDate' AND C.START_DATE < '$endDate'";
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
