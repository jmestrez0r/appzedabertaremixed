angular.module("Elifoot").controller('TeamPlayersController', function($scope, $timeout, TeamPlayers, ngDialog) {


  //defining radar graphs
  $scope.physicalLabels =["Altura", "Resistência", "Agilidade", "Salto Altura", "Salto Comprimento"];
  $scope.physicalData = [
    [$scope.physicalHeight, $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight, $scope.physicalJumpLong]
  ];
  $scope.velocityLabels =["Velocidade 10m", "Velocidade 20m", "Velocidade 50m", "Velocidade 100m"];
  $scope.velocityData = [
    [$scope.velocity10m, $scope.velocity20m, $scope.velocity50m, $scope.velocity100m]
  ];
  $scope.mentalLabels =["Liderança", "Equipa", "Rácio de Trabalho", "Determinação",
                        "Criatividade", "Concentração", "Agressividade"];
  $scope.mentalData = [
    [$scope.mentalLeadership, $scope.mentalTeam, $scope.mentalTeamWork, $scope.mentalDetermination,
      $scope.mentalCreativity, $scope.mentalFocus, $scope.mentalAgressive]
  ];
  $scope.technicalLabels =["Cruzamento", "Drible", "Finta de Trabalho", "Remate", "Finalização",
                            "Cabeceamento", "Primeiro Toque", "Recepção Orientada"];
  $scope.technicalData = [
    [$scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork, $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst, $scope.technicalReceive]
  ];
  $scope.technical2Labels =["Livres", "Lançamentos", "Penalties", "Cantos", "Técnica", "Passe Curto", "Passe Longo", "Remate Longa Distância"];
  $scope.technical2Data = [
    [$scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty, $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass, $scope.technicalLongShoot]
  ];

  $scope.selectedPlayer = '';
  $scope.goalKeepers = [];
  $scope.defenses = [];
  $scope.middles = [];
  $scope.strikers = [];

  $scope.leagueTable = sessionStorage.getItem('leagueTable');
  $scope.teamId = sessionStorage.getItem('teamId');
  $scope.effectiveTeamName = sessionStorage.getItem('effectiveTeamName');
  $scope.selectedTeamId = sessionStorage.getItem('selectedTeamId');

  //load the values with the selected team
  if(sessionStorage.getItem('selectedTeamId') != undefined &&
      sessionStorage.getItem('selectedTeamId') != '') {
      console.log('changing team id');
      $scope.teamId = sessionStorage.getItem('selectedTeamId');
  }

  TeamPlayers.all($scope.teamId).success(function(data) {
    var keepersIndex = 0;
    var middlesIndex = 0;
    var defensesIndex = 0;
    var strikersIndex = 0;

    for(var i = 0; i < data.players.length; i++) {
      var a = data.players[i];

      if(a.position.includes('Keeper')) {
        $scope.goalKeepers[keepersIndex] = a;
        keepersIndex++;
      } else if ((a.position.includes('Centre') && !a.position.includes('Forward'))
        || a.position.includes('Wing')) {
        $scope.middles[middlesIndex] = a;
        middlesIndex++;
      } else if (a.position.includes('Back') || a.position.includes('Defensive')) {
        $scope.defenses[defensesIndex] = a;
        defensesIndex++;
      } else if (a.position.includes('Forward') || a.position.includes('Striker')) {
        $scope.strikers[strikersIndex] = a;
        strikersIndex++;
      }
    }
    console.log(data);
  });


  TeamPlayers.effectiveTeam($scope.leagueTable).success(function (data) {
    console.log(data);
    //load the values with the selected team
    if(sessionStorage.getItem('selectedTeamId') != undefined &&
        sessionStorage.getItem('selectedTeamId') != '') {
        console.log('changing effective team + ' );
        $scope.effectiveTeamName = sessionStorage.getItem('selectedEffectiveTeamName');
    }
    for(var i = 0; i < data.teams.length; i++) {
        if(data.teams[i].name == $scope.effectiveTeamName) {
          $scope.effectiveTeam = data.teams[i];
          console.log($scope.effectiveTeam);
          return;
        }
    }
  });

  $scope.openDeletePlayerDialog = function(player) {
    $scope.selectedPlayer = player;

    ngDialog.open({
      template: 'deletePlayer.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      showClose: false,
      height: 250,
      weight: 600
    });
  };

  $scope.openPlayerInformationDialog = function(player, details) {
    $scope.selectedPlayer = player;
    $scope.details = details;

    $scope.loadValuesPlayerValues();

    ngDialog.open({
      template: 'playerInformation.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      showClose: false,
      height: 600,
      width: 800
    });
  };

  $scope.deletePlayer = function() {
    if($scope.selectedPlayer.position.includes('Keeper')) {
      var index = $scope.goalKeepers.indexOf($scope.selectedPlayer);
      $scope.goalKeepers.splice(index, 1);
    } else if (($scope.selectedPlayer.position.includes('Centre') &&
        !$scope.selectedPlayer.position.includes('Forward')) ||
        $scope.selectedPlayer.position.includes('Wing')) {
      var index = $scope.middles.indexOf($scope.selectedPlayer);
      $scope.middles.splice(index, 1);
    } else if ($scope.selectedPlayer.position.includes('Back') ||
        $scope.selectedPlayer.position.includes('Defensive')) {
       var index = $scope.defenses.indexOf($scope.selectedPlayer);
       $scope.defenses.splice(index, 1);
    } else if ($scope.selectedPlayer.position.includes('Forward') ||
        $scope.selectedPlayer.position.includes('Striker')) {
      var index = $scope.strikers.indexOf($scope.selectedPlayer);
      $scope.strikers.splice(index, 1);
    }
  };

  $scope.savePlayer = function() {
    $scope.selectedPlayer.teamSpirit = $scope.dynamicEquipa;
    $scope.selectedPlayer.finalShoot = $scope.dynamicFinal;
    $scope.selectedPlayer.resistance = $scope.dynamicResist;

    //it exists
    if($scope.selectedPlayer.$$hashKey != null && $scope.selectedPlayer.$$hashKey != '') {
        if($scope.selectedPlayer.position.includes('Keeper')) {
          var index = $scope.goalKeepers.indexOf($scope.selectedPlayer);
          $scope.goalKeepers.splice(index, 1);
          $scope.goalKeepers.push(index, $scope.selectedPlayer);
        } else if (($scope.selectedPlayer.position.includes('Centre') &&
            !$scope.selectedPlayer.position.includes('Forward')) ||
            $scope.selectedPlayer.position.includes('Wing')) {
          var index = $scope.middles.indexOf($scope.selectedPlayer);
          $scope.middles.splice(index, 1);
          $scope.middles.push(index, $scope.selectedPlayer);
        } else if ($scope.selectedPlayer.position.includes('Back') ||
            $scope.selectedPlayer.position.includes('Defensive')) {
           var index = $scope.defenses.indexOf($scope.selectedPlayer);
           $scope.defenses.splice(index, 1);
           $scope.defenses.push(index, $scope.selectedPlayer);
        } else if ($scope.selectedPlayer.position.includes('Forward') ||
            $scope.selectedPlayer.position.includes('Striker')) {
          var index = $scope.strikers.indexOf($scope.selectedPlayer);
          $scope.strikers.splice(index, 1);
          $scope.strikers.push(index, $scope.selectedPlayer);
        }
    } else {
      if($scope.selectedPlayer.position.includes('Keeper')) {
        $scope.goalKeepers.push($scope.selectedPlayer);
      } else if (($scope.selectedPlayer.position.includes('Centre') &&
          !$scope.selectedPlayer.position.includes('Forward')) ||
          $scope.selectedPlayer.position.includes('Wing')) {
        $scope.middles.push($scope.selectedPlayer);
      } else if ($scope.selectedPlayer.position.includes('Back') ||
          $scope.selectedPlayer.position.includes('Defensive')) {
         $scope.defenses.push($scope.selectedPlayer);
      } else if ($scope.selectedPlayer.position.includes('Forward') ||
          $scope.selectedPlayer.position.includes('Striker')) {
        $scope.strikers.push($scope.selectedPlayer);
      }
    }
  };

  $scope.loadValuesPlayerValues = function() {
    //dummy values
    $scope.physicalHeight = 40;
    $scope.physicalResist = 90;
    $scope.physicalAgility = 80;
    $scope.physicalJumpHeight = 40;
    $scope.physicalJumpLong = 30;
    $scope.velocity10m = 50;
    $scope.velocity20m = 50;
    $scope.velocity50m = 70;
    $scope.velocity100m = 80;
    $scope.mentalLeadership = 60;
    $scope.mentalTeam = 40;
    $scope.mentalTeamWork = 20;
    $scope.mentalDetermination = 70;
    $scope.mentalCreativity = 80;
    $scope.mentalFocus = 80;
    $scope.mentalAgressive = 40;
    $scope.technicalCruzamento = 40;
    $scope.technicalDrible = 50;
    $scope.technicalWork = 10;
    $scope.technicalShoot = 80;
    $scope.technicalFinish = 40;
    $scope.technicalHead = 60;
    $scope.technicalFirst = 60;
    $scope.technicalReceive = 50;
    $scope.technicalFree = 40;
    $scope.technicalLaunch = 80;
    $scope.technicalPenalty = 70;
    $scope.technicalCorner = 20;
    $scope.technicalTech = 70;
    $scope.technicalShortPass = 60;
    $scope.technicalLongPass = 50;
    $scope.technicalLongShoot = 50;
  };
});
