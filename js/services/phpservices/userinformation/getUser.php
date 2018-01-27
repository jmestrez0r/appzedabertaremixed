<?php

	include('../config.php');

	$user = $data->user;

	$sql = "SELECT U.USERNAME as username, U.NAME as name, U.TEAM_ID as teamId, T.NAME as effectiveTeamName, T.CRESTURL as crestUrl,
		U.LEAGUE_TABLE as leagueTable, U.AGE as age,
		U.PLACE_OF_BIRTH as placeOfBirth, U.PROFILE_ID as profileId, P.PROFILE_TYPE as profileType,
		U.NATIONALITY as nationality, U.PICTURE as picture
		FROM USERS U INNER JOIN PROFILES P ON U.PROFILE_ID = P.PROFILE_ID
			INNER JOIN TEAM T ON U.TEAM_ID = T.TEAM_ID
		WHERE `USERNAME` = '$user'";
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
