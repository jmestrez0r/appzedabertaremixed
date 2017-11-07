<?php

	include('../config.php');

	$imagename = $_FILES['avatar'];
	echo $imagename;

	//Get the content of the image and then add slashes to it
	$imagetmp = addslashes(file_get_contents($_FILES['avatar']));
	echo $imagetmp;

	//Insert the image name and image content in image_table
	$insert_image="INSERT INTO image_table VALUES('$imagetmp','$imagename')";

	$qry = mysqli_query($con, $insert_image);

	if($qry === TRUE) {
		echo "Inserted record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

?>
