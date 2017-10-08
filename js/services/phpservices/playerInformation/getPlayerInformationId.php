<?php

	include('../config.php');

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
	$mentalFocus = $data->mentalFocus;
	$mentalAgressive = $data->mentalAgressive;
	$technicalCruzamento = $data->technicalCruzamento;
	$technicalDrible = $data->technicalDrible;
	$technicalWork = $data->technicalWork;
	$technicalShoot = $data->technicalShoot;
	$technicalFinish = $data->technicalFinish;
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

	$sql = "SELECT ATTRIBUTES_ID as attributesId FROM `ATTRIBUTES`
	WHERE `ALTURA`= $physicalHeight
	 AND `RESISTENCIA`= $physicalResist
	 AND `AGILIDADE`= $physicalAgility
	 AND `SALTO_ALTURA`= $physicalJumpHeight
	 AND `SALTO_COMPRIMENTO`= $physicalJumpLong
	 AND `ACELERACAO`= $acelaration
	 AND `VELOCIDADE_10`= $velocity10m
	 AND `VELOCIDADE_20`= $velocity20m
	 AND `VELOCIDADE_50m`= $velocity50m
	 AND `VELOCIDADE_100m`= $velocity100m
	 AND `LIDERANCA`= $mentalLeadership
	 AND `EQUIPA`= $mentalTeam
	 AND `RACIO_TRABALHO`= $mentalTeamWork
	 AND `DETERMINACAO`= $mentalDetermination
	 AND `CRIATIVIDADE`= $mentalCreativity
	 AND `CONCENTRACAO`= $mentalFocus
	 AND `AGRESSIVIDADE`= $mentalAgressive
	 AND `CRUZAMENTO`= $technicalCruzamento
	 AND `DRIBLE`= $technicalDrible
	 AND `FINTA`= $technicalWork
	 AND `REMATE`= $technicalShoot
	 AND `FINALIZACAO`= $technicalFinish
	 AND `CABECEAMENTO`= $technicalHead
	 AND `PRIMEIRO_TOQUE`= $technicalFirst
	 AND `RECEPCAO_ORIENTADA`= $technicalReceive
	 AND `LIVRES`= $technicalFree
	 AND `LANCAMENTOS`= $technicalLaunch
	 AND `PENALTIES`= $technicalPenalty
	 AND `CANTOS`= $technicalCorner
	 AND `TECNICA`= $technicalTech
	 AND `PASSE_CURTO`= $technicalShortPass
	 AND `PASSE_LONGO`= $technicalLongPass
	 AND `REMATE_LONGA_DISTANCIA`= $technicalLongShoot";

	$qryid = mysqli_query($con, $sql);

	$dataid = array();

	if($qryid->num_rows > 0) {
		while($row = $qryid->fetch_object()) {
			$dataid[] = $row;
		}
	} else {
		$dataid[] = null;
	}

	$con->close();

	echo json_encode($dataid);

?>
