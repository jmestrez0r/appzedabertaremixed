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

	$sql = "INSERT INTO `ATTRIBUTES`(`ALTURA`, `RESISTENCIA`, `AGILIDADE`, `SALTO_ALTURA`,
		`SALTO_COMPRIMENTO`, `ACELERACAO`, `VELOCIDADE_10`, `VELOCIDADE_20`, `VELOCIDADE_50m`,
		`VELOCIDADE_100m`, `LIDERANCA`, `EQUIPA`, `RACIO_TRABALHO`, `DETERMINACAO`,	`CRIATIVIDADE`,
		`CONCENTRACAO`, `AGRESSIVIDADE`, `CRUZAMENTO`, `DRIBLE`, `FINTA`, `REMATE`, `FINALIZACAO`,
		`CABECEAMENTO`, `PRIMEIRO_TOQUE`, `RECEPCAO_ORIENTADA`, `LIVRES`, `LANCAMENTOS`, `PENALTIES`,
		`CANTOS`, `TECNICA`, `PASSE_CURTO`,	`PASSE_LONGO`, `REMATE_LONGA_DISTANCIA`)
		values ($physicalHeight, $physicalResist, $physicalAgility, $physicalJumpHeight, $physicalJumpLong,
				$acelaration, $velocity10m, $velocity20m, $velocity50m, $velocity100m, $mentalLeadership,
				$mentalTeam, $mentalTeamWork, $mentalDetermination, $mentalCreativity, $mentalFocus,
				$mentalAgressive, $technicalCruzamento, $technicalDrible, $technicalWork, $technicalShoot,
				$technicalFinish, $technicalHead, $technicalFirst, $technicalReceive, $technicalFree,
				$technicalLaunch, $technicalPenalty, $technicalCorner, $technicalTech, $technicalShortPass,
				$technicalLongPass, $technicalLongShoot)";

	$qry = mysqli_query($con, $sql);

	if($qry === TRUE) {
		echo "New record!";
	} else {
		echo "Error: " . $qry . "<br>" . $con->error;
	}

	$con->close();

?>
