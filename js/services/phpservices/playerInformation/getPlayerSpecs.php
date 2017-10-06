<?php

	include('../config.php');


	$attributes_id = $data->$attributes_id;

	$sql = "SELECT ATTRIBUTES_ID as attributesId, ALTURA as physicalHeight, RESISTENCIA as physicalResist,
		AGILIDADE as physicalAgility, SALTO_ALTURA as physicalJumpHeight, SALTO_COMPRIMENTO as physicalJumpLong,
		ACELERACAO as acelaration, VELOCIDADE_10 as velocity10m, VELOCIDADE_20 as velocity20m, VELOCIDADE_50m as velocity50m,
		VELOCIDADE_100m as velocity100m, LIDERANCA as mentalLeadership, EQUIPA as mentalTeam, RACIO_TRABALHO as mentalTeamWork,
		DETERMINACAO as mentalDetermination, CRIATIVIDADE as mentalCreativity, CONCENTRACAO as mentalFocus,
		AGRESSIVIDADE as mentalAgressive, CRUZAMENTO as technicalCruzamento, DRIBLE as technicalDrible,
		FINTA as technicalWork, REMATE as technicalShoot, FINALIZACAO as technicalFinish, CABECEAMENTO as technicalHead,
		PRIMEIRO_TOQUE as technicalFirst, RECEPCAO_ORIENTADA as technicalReceive, LIVRES as technicalFree,
		LANCAMENTOS as technicalLaunch, PENALTIES as technicalPenalty, CANTOS as technicalCorner, TECNICA as technicalTech,
		PASSE_CURTO as technicalShortPass, PASSE_LONGO as technicalLongPass, REMATE_LONGA_DISTANCIA as technicalLongShoot
 FROM `ATTRIBUTES` WHERE `ATTRIBUTES_ID` = '$attributes_id'";

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
