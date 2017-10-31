<?php

	include('../config.php');

	$teamId = $data->teamId;
	$startDate = $data->startDate;
	$endDate = $data->endDate;

	$sql = "SELECT COUNT(TYPE) as occurrences, TYPE as type, '$startDate' as startDate
				FROM CALENDAR
				where TEAM_ID = '$teamId' AND START_DATE > '$startDate'
					AND START_DATE < '$endDate'
				group by TYPE
				order by TYPE";
	$qry = mysqli_query($con, $sql);

	$data = array();

	if($qry->num_rows > 0) {
		while($row = $qry->fetch_object()) {
			$data[] = $row;
		}
	} else {
		$data[] = $startDate;
	}

	$con->close();

	echo json_encode($data);

?>
