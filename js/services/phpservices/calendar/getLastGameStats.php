<?php

	include('../config.php');

	$teamId = $data->teamId;

	$sql = "SELECT SUCCESS_PASS as successPass, FAILED_PASS as failedPass, CROSSING_PASS as crossingPass, FAILED_CROSSING_PASS as failedCrossingPass, BALL_WON as ballWon,
					BALL_FAILED as ballFailed, HEADING as heading, FOUL as foul, DISARM as disarm, YELLOW_CARD as yellowCard, DRIBLE as drible, RED_CARD as redCard, SHOOT_SIDE as shootSide,
					SELF_GOAL as selfGoal, SHOOT_GOAL as shootGoal, OFFSIDE as offside, INTERCEPTED_SHOOT as interceptedShoot, WON_HEADING as wonHeading, GOAL as goal, ASSIST as assist
				from GAME_STATS
				where TEAM_ID = $teamId";
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
