<?php

	include('../config.php');

	$attributesId = $data->attributesId;

	$sql = "SELECT A.ATTRIBUTES_ID as attributesId, A.ALTURA as physicalHeight, A.RESISTENCIA as physicalResist,
		A.AGILIDADE as physicalAgility, A.SALTO_ALTURA as physicalJumpHeight, A.SALTO_COMPRIMENTO as physicalJumpLong,
		A.ACELERACAO as acelaration, A.VELOCIDADE_10 as velocity10m, A.VELOCIDADE_20 as velocity20m, A.VELOCIDADE_50m as velocity50m,
		A.VELOCIDADE_100m as velocity100m, A.LIDERANCA as mentalLeadership, A.EQUIPA as mentalTeam, A.RACIO_TRABALHO as mentalTeamWork,
		A.DETERMINACAO as mentalDetermination, A.CRIATIVIDADE as mentalCreativity, A.CONCENTRACAO as mentalFocus,
		A.AGRESSIVIDADE as mentalAgressive, A.CRUZAMENTO as technicalCruzamento, A.DRIBLE as technicalDrible,
		A.FINTA as technicalWork, A.REMATE as technicalShoot, A.FINALIZACAO as technicalFinish, A.CABECEAMENTO as technicalHead,
		A.PRIMEIRO_TOQUE as technicalFirst, A.RECEPCAO_ORIENTADA as technicalReceive, A.LIVRES as technicalFree,
		A.LANCAMENTOS as technicalLaunch, A.PENALTIES as technicalPenalty, A.CANTOS as technicalCorner, A.TECNICA as technicalTech,
		A.PASSE_CURTO as technicalShortPass, A.PASSE_LONGO as technicalLongPass, A.REMATE_LONGA_DISTANCIA as technicalLongShoot,
		P.PICTURE as pictureBlob
 FROM `ATTRIBUTES` A INNER JOIN PLAYER P ON A.ATTRIBUTES_ID = P.ATTRIBUTES_ID
 WHERE A.ATTRIBUTES_ID = '$attributesId'";

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
