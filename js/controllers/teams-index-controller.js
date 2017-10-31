angular.module("Elifoot").controller('TeamPlayersController', function($scope, $cookies, $location, $timeout, TeamPlayers, ngDialog) {


  //defining radar graphs
  $scope.physicalLabels =["Altura", "Resistência", "Agilidade", "Salto Altura", "Salto Comprimento"];
  $scope.velocityLabels =["Velocidade 10m", "Velocidade 20m", "Velocidade 50m", "Velocidade 100m"];
  $scope.mentalLabels =["Liderança", "Equipa", "Rácio de Trabalho", "Determinação",
                        "Criatividade", "Concentração", "Agressividade"];
  $scope.technicalLabels =["Cruzamento", "Drible", "Finta de Trabalho", "Remate", "Finalização",
                            "Cabeceamento", "Primeiro Toque", "Recepção Orientada"];
  $scope.technical2Labels =["Livres", "Lançamentos", "Penalties", "Cantos", "Técnica", "Passe Curto", "Passe Longo", "Remate Longa Distância"];

  $scope.technical2Data = [
    [$scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty, $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass, $scope.technicalLongShoot]
  ];
  $scope.technicalData = [
    [$scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork, $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst, $scope.technicalReceive]
  ];
  $scope.mentalData = [
    [$scope.mentalLeadership, $scope.mentalTeam, $scope.mentalTeamWork, $scope.mentalDetermination,
      $scope.mentalCreativity, $scope.mentalFocus, $scope.mentalAgressive]
  ];
  $scope.velocityData = [
    [$scope.velocity10m, $scope.velocity20m, $scope.velocity50m, $scope.velocity100m]
  ];
  $scope.physicalData = [
    [$scope.physicalHeight, $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight, $scope.physicalJumpLong]
  ];

  $scope.selectedPlayer = '';
  $scope.goalKeepers = [];
  $scope.defenses = [];
  $scope.middles = [];
  $scope.strikers = [];
  $scope.staff = [];

  $scope.leagueTable = sessionStorage.getItem('leagueTable');
  $scope.teamId = sessionStorage.getItem('teamId');
  $scope.effectiveTeamName = sessionStorage.getItem('effectiveTeamName');
  $scope.selectedTeamId = sessionStorage.getItem('selectedTeamId');

  //load the values with the selected team
  if(sessionStorage.getItem('selectedTeamId') != undefined &&
      sessionStorage.getItem('selectedTeamId') != '') {
      console.log('changing team id');
      $scope.teamId = sessionStorage.getItem('selectedTeamId');
      sessionStorage.getItem('otherTeamView', false);
  }

  if(sessionStorage.getItem('otherTeamView') == "true") {
    $scope.otherTeamView = true;
  } else {
    $scope.otherTeamView = false;
  }

  TeamPlayers.all($scope.teamId).success(function(data) {
    //load from other source
    if(data[0] == null || data == '') {
      TeamPlayers.allFromSource($scope.teamId).success(function(dataFromSource) {
        data = dataFromSource;
        //loadPlayers
        loadPlayers(data);
      });
    } else {
      data.players = data;
      loadPlayers(data);
    }
    console.log(data);
  });

  TeamPlayers.effectiveTeam($scope.teamId).success(function (data) {
    //load the values with the selected team
    if(sessionStorage.getItem('selectedTeamId') != undefined &&
        sessionStorage.getItem('selectedTeamId') != '') {
        console.log('changing effective team - selectedTeamId > ' + sessionStorage.getItem('selectedTeamId'));
        $scope.effectiveTeamName = sessionStorage.getItem('selectedEffectiveTeamName');
        console.log('changing effective team - selectedEffectiveTeamName > ' + sessionStorage.getItem('selectedEffectiveTeamName'));
    }
    //load from other source
    if(data[0] == null || data == '') {
      TeamPlayers.effectiveTeamFromSource($scope.teamId).success(function(dataFromSource) {
        data = dataFromSource;
        loadEffectiveTeam(data);
      });
    } else {
      loadEffectiveTeam(data[0]);
    }
  });


  function loadPlayers(data) {
    var keepersIndex = 0;
    var middlesIndex = 0;
    var defensesIndex = 0;
    var strikersIndex = 0;
    var staffIndex = 0;

    for(var i = 0; i < data.players.length; i++) {
      var a = data.players[i];
      var playerConfirmation = false;

      if(a.position.includes('Keeper')) {
        $scope.goalKeepers[keepersIndex] = a;
        keepersIndex++;
        playerConfirmation = true;
      } else if ((a.position.includes('Centre') && !a.position.includes('Forward'))
        || a.position.includes('Wing')) {
        $scope.middles[middlesIndex] = a;
        middlesIndex++;
        playerConfirmation = true;
      } else if (a.position.includes('Back') || a.position.includes('Defensive')) {
        $scope.defenses[defensesIndex] = a;
        defensesIndex++;
        playerConfirmation = true;
      } else if (a.position.includes('Forward') || a.position.includes('Striker')) {
        $scope.strikers[strikersIndex] = a;
        strikersIndex++;
        playerConfirmation = true;
      } else if(!playerConfirmation) {
        $scope.staff[staffIndex] = a;
        staffIndex++;
      }
    }
  }

  function loadEffectiveTeam(data) {
    $scope.effectiveTeam = data;
  }



  // DIALOGS
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
    $cookies.putObject('selectedPlayer', player);
    if(details == true) {
      $cookies.put('readOnly', 'disabled');
    } else {
      $cookies.put('readOnly', '');
    }
    $location.path('/addplayer');
  };


  //LOAD DATA OF THE PLAYER
  $scope.loadSelectedPlayer = function() {
    $scope.selectedPlayer = $cookies.getObject('selectedPlayer');
    $scope.details = $cookies.get('readOnly');
    if($scope.selectedPlayer != undefined &&
      $scope.selectedPlayer.attributesId != '' &&
      $scope.selectedPlayer.attributesId != null) {
        $scope.loadValuesPlayerValues($scope.selectedPlayer.attributesId);
    }

    $cookies.remove('selectedPlayer');
    $cookies.remove('readOnly');
  };



  //DELETE PLAYER
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

    TeamPlayers.deletePlayer($scope.selectedPlayer).success(function (data) {
        console.log("player removed...");
        console.log(data);
    });
  };



  //SAVE PLAYER INFORMATION
  $scope.savePlayer = function() {

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

    //it exists
    if($scope.selectedPlayer.playerId != undefined &&
      $scope.selectedPlayer.playerId != null && $scope.selectedPlayer.playerId != '') {
      TeamPlayers.updatePlayerInformation($scope.selectedPlayer, $scope.physicalHeight,
          $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight,
          $scope.physicalJumpLong, $scope.acelaration, $scope.velocity10m, $scope.velocity20m,
          $scope.velocity50m, $scope.velocity100m, $scope.mentalLeadership, $scope.mentalTeam,
          $scope.mentalTeamWork, $scope.mentalDetermination, $scope.mentalCreativity, $scope.mentalFocus,
          $scope.mentalAgressive, $scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork,
          $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst,
          $scope.technicalReceive, $scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty,
          $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass,
         $scope.technicalLongShoot).success(function (data) {
        console.log(data);
        console.log("player information updated!");
        //UPDATE PLAYER IN DATABASE
        TeamPlayers.updatePlayer($scope.selectedPlayer).success(function (data) {
            console.log(data);
            console.log("player updated!");

            $location.path('/players');

            ngDialog.open({
                template: 'successMessage.html',
                className: 'ngdialog-theme-default',
                showClose: false
            });
        });
      });

    } else {
      $scope.selectedPlayer.teamId = $scope.teamId;
      TeamPlayers.createPlayerInformation($scope.selectedPlayer, $scope.physicalHeight,
          $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight,
          $scope.physicalJumpLong, $scope.acelaration, $scope.velocity10m, $scope.velocity20m,
          $scope.velocity50m, $scope.velocity100m, $scope.mentalLeadership, $scope.mentalTeam,
          $scope.mentalTeamWork, $scope.mentalDetermination, $scope.mentalCreativity, $scope.mentalFocus,
          $scope.mentalAgressive, $scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork,
          $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst,
          $scope.technicalReceive, $scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty,
          $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass,
          $scope.technicalLongShoot).success(function (data) {

           //verify if exists
           TeamPlayers.getPlayerInformationId($scope.physicalHeight,
               $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight,
               $scope.physicalJumpLong, $scope.acelaration, $scope.velocity10m, $scope.velocity20m,
               $scope.velocity50m, $scope.velocity100m, $scope.mentalLeadership, $scope.mentalTeam,
               $scope.mentalTeamWork, $scope.mentalDetermination, $scope.mentalCreativity, $scope.mentalFocus,
               $scope.mentalAgressive, $scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork,
               $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst,
               $scope.technicalReceive, $scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty,
               $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass,
               $scope.technicalLongShoot).success(function (data2) {
                console.log(data2);
                if(data2[0] != undefined && data2[0] != null && data2[0] != '') {
                    console.log("player information created!");
                    $scope.selectedPlayer.attributesId = data2[0].attributesId;

                    $scope.selectedPlayer.pictureBlob = '';

                    if($scope.selectedPlayer.contractUntil == undefined || $scope.selectedPlayer.contractUntil == '') {
                      var date = new Date();
                      var d = date.getDate();
                      var m = date.getMonth();
                      var y = date.getFullYear();
                      $scope.selectedPlayer.contractUntil = $.datepicker.formatDate("yy-mm-dd", new Date(y+10, m, d, 0, 0));
                    }

                    $scope.selectedPlayer.marketValue = '';

                    //SAVE PLAYER IN DATABASE
                    TeamPlayers.savePlayer($scope.selectedPlayer).success(function (data3) {
                        console.log(data3);
                        console.log("player created!");

                        $location.path('/players');

                        ngDialog.open({
                            template: 'successMessage.html',
                            className: 'ngdialog-theme-default',
                            showClose: false,
                            height: 400
                        });
                    });
                }
          });
      });
    }
  };



  $scope.loadValuesPlayerValues = function(id) {

    if(id != undefined) {
      TeamPlayers.getPlayerSpecs(id).success(function (data) {
        console.log(data);
        var playerSpecs = data[0];
        $scope.physicalHeight = data[0].physicalHeight;
        $scope.physicalResist = data[0].physicalResist;
        $scope.physicalAgility = data[0].physicalAgility;
        $scope.physicalJumpHeight = data[0].physicalJumpHeight;
        $scope.physicalJumpLong = data[0].physicalJumpLong;
        $scope.acelaration = data[0].acelaration;
        $scope.velocity10m = data[0].velocity10m;
        $scope.velocity20m = data[0].velocity20m;
        $scope.velocity50m = data[0].velocity50m;
        $scope.velocity100m = data[0].velocity100m;
        $scope.mentalLeadership = data[0].mentalLeadership;
        $scope.mentalTeam = data[0].mentalTeam;
        $scope.mentalTeamWork = data[0].mentalTeamWork;
        $scope.mentalDetermination = data[0].mentalDetermination;
        $scope.mentalCreativity = data[0].mentalCreativity;
        $scope.mentalFocus = data[0].mentalFocus
        $scope.mentalAgressive = data[0].mentalAgressive;
        $scope.technicalCruzamento = data[0].technicalCruzamento;
        $scope.technicalDrible = data[0].technicalDrible;
        $scope.technicalWork = data[0].technicalWork;
        $scope.technicalShoot = data[0].technicalShoot
        $scope.technicalFinish = data[0].technicalFinish
        $scope.technicalHead = data[0].technicalHead;
        $scope.technicalFirst = data[0].technicalFirst;
        $scope.technicalReceive = data[0].technicalReceive;
        $scope.technicalFree = data[0].technicalFree;
        $scope.technicalLaunch = data[0].technicalLaunch;
        $scope.technicalPenalty = data[0].technicalPenalty;
        $scope.technicalCorner = data[0].technicalCorner;
        $scope.technicalTech = data[0].technicalTech;
        $scope.technicalShortPass = data[0].technicalShortPass;
        $scope.technicalLongPass = data[0].technicalLongPass;
        $scope.technicalLongShoot = data[0].technicalLongShoot;
        loadSpecsList();
      });
    } else {
      //load only the specs
    }
  };

  function loadSpecsList() {
    $scope.technical2Data = [
      [$scope.technicalFree, $scope.technicalLaunch, $scope.technicalPenalty, $scope.technicalCorner, $scope.technicalTech, $scope.technicalShortPass, $scope.technicalLongPass, $scope.technicalLongShoot]
    ];
    $scope.technicalData = [
      [$scope.technicalCruzamento, $scope.technicalDrible, $scope.technicalWork, $scope.technicalShoot, $scope.technicalFinish, $scope.technicalHead, $scope.technicalFirst, $scope.technicalReceive]
    ];
    $scope.mentalData = [
      [$scope.mentalLeadership, $scope.mentalTeam, $scope.mentalTeamWork, $scope.mentalDetermination,
        $scope.mentalCreativity, $scope.mentalFocus, $scope.mentalAgressive]
    ];
    $scope.velocityData = [
      [$scope.velocity10m, $scope.velocity20m, $scope.velocity50m, $scope.velocity100m]
    ];
    $scope.physicalData = [
      [$scope.physicalHeight, $scope.physicalResist, $scope.physicalAgility, $scope.physicalJumpHeight, $scope.physicalJumpLong]
    ];
  }
});
