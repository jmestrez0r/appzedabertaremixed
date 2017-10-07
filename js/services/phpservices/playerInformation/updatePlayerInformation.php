<?php

	include('../config.php');

	$attributesId = $data->player_id;
	$physicalHeight = $data->physicalHeight;
	$physicalResist = $data->physicalResist;
	$physicalAgility = $data->physicalAgility;
	$physicalJumpHeight = $data->physicalJumpHeight;
	$physicalJumpLong = $data->physicalJumpLong;
	$acelaration = $data->acelaration;
	$velocity10m = $data->velocity10m;
	$velocity20m = $data->velocity20m;
	$velocity50m = $data->velocity50m;
	$velocity100m = $data->velocity100m;
	$mentalLeadership = $data->mentalLeadership;
	$mentalTeam = $data->mentalTeam;
	$mentalTeamWork = $data->mentalTeamWork;
	$mentalDetermination = $data->mentalDetermination;
	$mentalCreativity = $data->mentalCreativity;
	$mentalFocus = $data->mentalFocus
	$mentalAgressive = $data->mentalAgressive;
	$technicalCruzamento = $data->technicalCruzamento;
	$technicalDrible = $data->technicalDrible;
	$technicalWork = $data->technicalWork;
	$technicalShoot = $data->technicalShoot
	$technicalFinish = $data->technicalFinish
	$technicalHead = $data->technicalHead;
	$technicalFirst = $data->technicalFirst;
	$technicalReceive = $data->technicalReceive;
	$technicalFree = $data->technicalFree;
	$technicalLaunch = $data->technicalLaunch;
	$technicalPenalty = $data->technicalPenalty;
	$technicalCorner = $data->technicalCorner;
	$technicalTech = $data->technicalTech;
	$technicalShortPass = $data->technicalShortPass;
	$technicalLongPass = $data->technicalLongPass;
	$technicalLongShoot = $data->technicalLongShoot;

	$sqlid = "UPDATE `ATTRIBUTES`
		SET `ALTURA`= $physicalHeight,
			 `RESISTENCIA`= $physicalResist,
			 `AGILIDADE`= $physicalAgility,
			 `SALTO_ALTURA`= $physicalJumpHeight,
			 `SALTO_COMPRIMENTO`= $physicalJumpLong,
			 `ACELERACAO`= $acelaration,
			 `VELOCIDADE_10`= $velocity10m,
			 `VELOCIDADE_20`= $velocity20m,
			 `VELOCIDADE_50m`= $velocity50m,
			 `VELOCIDADE_100m`= $velocity100m,
			 `LIDERANCA `= $mentalLeadership,
			 `EQUIPA`= $mentalTeam,
			 `RACIO_TRABALHO`= $mentalTeamWork,
			 `DETERMINACAO`= $mentalDetermination,
			 `CRIATIVIDADE`= $mentalCreativity,
			 `CONCENTRACAO`= $mentalFocus,
			 `AGRESSIVIDADE`= $mentalAgressive,
			 `CRUZAMENTO`= $technicalCruzamento,
			 `DRIBLE`= $technicalDrible,
			 `FINTA`= $technicalWork,
			 `REMATE`= $technicalShoot,
			 `FINALIZACAO`= $technicalFinish,
			 `CABECEAMENTO`= $technicalHead,
			 `PRIMEIRO_TOQUE`= $technicalFirst,
			 `RECEPCAO_ORIENTADA`= $technicalReceive,
			 `LIVRES`= $technicalFree,
			 `LANCAMENTOS`= $technicalLaunch,
			 `PENALTIES`= $technicalPenalty,
			 `CANTOS`= $technicalCorner,
			 `TECNICA`= $technicalTech,
			 `PASSE_CURTO`= $technicalShortPass,
			 `PASSE_LONGO`= $technicalLongPass,
			 `REMATE_LONGA_DISTANCIA`= $technicalLongShoot
		WHERE ATTRIBUTES_ID = $attributesId"
	$qryid = mysqli_query($con, $sqlid);

	$data = array();

	if($qryid->num_rows > 0) {
		while($row = $qryid->fetch_object()) {
			$data[] = $row;
		}
	} else {
		$data[] = null;
	}

	$con->close();

	echo json_encode($data);

?>
