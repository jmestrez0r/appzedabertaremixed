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

	$sql = "INSERT INTO `ATTRIBUTES`(`ALTURA`, `RESISTENCIA`, `AGILIDADE`, `SALTO_ALTURA`,
		`SALTO_COMPRIMENTO`, `ACELERACAO`, `VELOCIDADE_10`, `VELOCIDADE_20`, `VELOCIDADE_50m`,
		`VELOCIDADE_100m`, `LIDERANCA`, `EQUIPA`, `RACIO_TRABALHO`, `DETERMINACAO`,	`CRIATIVIDADE`,
		`CONCENTRACAO`, `AGRESSIVIDADE`, `CRUZAMENTO`, `DRIBLE`, `FINTA`, `REMATE`, `FINALIZACAO`,
		`CABECEAMENTO`, `PRIMEIRO_TOQUE`, `RECEPCAO_ORIENTADA`, `LIVRESLANCAMENTOS`, `PENALTIES`,
		`CANTOS`, `TECNICA`, `PASSE_CURTO`,	`PASSE_LONGO`, `REMATE_LONGA_DISTANCIA`)
		values ($physicalHeight, $physicalResist, $physicalAgility, $physicalJumpHeight, $physicalJumpLong,
				$acelaration, $velocity10m, $velocity20m, $velocity50m, $velocity100m, $mentalLeadership,
				$mentalTeam, $mentalTeamWork, $mentalDetermination, $mentalCreativity, $mentalFocus,
				$mentalAgressive, $technicalCruzamento, $technicalDrible, $technicalWork, $technicalShoot,
				$technicalFinish, $technicalHead, $technicalFirst, $technicalReceive, $technicalFree,
				$technicalLaunch, $technicalPenalty, $technicalCorner, $technicalTech, $technicalShortPass,
				$technicalLongPass, $technicalLongShoot)";

	$qry = mysqli_query($con, $sql);

	$sqlid = "SELECT ID as id FROM `ATTRIBUTES` WHERE `ALTURA`= $physicalHeight
	 AND `RESISTENCIA`= $physicalResist
	 AND `AGILIDADE`= $physicalAgility
	 AND `SALTO_ALTURA`= $physicalJumpHeight
	 AND `SALTO_COMPRIMENTO`= $physicalJumpLong
	 AND `ACELERACAO`= $acelaration
	 AND `VELOCIDADE_10`= $velocity10m
	 AND `VELOCIDADE_20`= $velocity20m
	 AND `VELOCIDADE_50m`= $velocity50m
	 AND `VELOCIDADE_100m`= $velocity100m
	 AND `LIDERANCA `= $mentalLeadership
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
	 AND `REMATE_LONGA_DISTANCIA`= $technicalLongShoot"
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
