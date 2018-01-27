<?php

	include('../config.php');

	$oldUser = $data->oldUser;
	$oldPassword = $data->oldPassword;
	$newPassword = $data->newPassword;
	$placeOfBirth = $data->placeOfBirth;
	$age = $data->age;
	$picture = $data->picture;
	$nationality = $data->nationality;
	$name = $data->name;

	if($newPassword === '') {
		$sql = "UPDATE `USERS`
				SET `PLACE_OF_BIRTH` = '$placeOfBirth',
				`NATIONALITY` = '$nationality',
				`PICTURE` = '$picture',
				`NAME` = '$name',
				`UPDATE_DATE` = NOW()
			WHERE `USERNAME` = '$oldUser' AND `PASSWORD` = '$oldPassword'";
	} else {
		$sql = "UPDATE `USERS`
				SET `PASSWORD` = '$newPassword',
				`PLACE_OF_BIRTH` = '$placeOfBirth',
				`NATIONALITY` = '$nationality',
				`PICTURE` = '$picture',
				`NAME` = '$name',
				`UPDATE_DATE` = NOW()
			WHERE `USERNAME` = '$oldUser' AND `PASSWORD` = '$oldPassword'";
	}

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "Updated user";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
