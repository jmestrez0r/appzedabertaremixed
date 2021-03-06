angular.module("Elifoot").controller('TeamPlayersController', function($scope, $cookies, $location, $timeout, TeamPlayers, ngDialog) {

  // INITIAL LOGIN module
  $scope.username = sessionStorage.getItem('user');
  $scope.password;
  $scope.otherTeamView = false;
  $scope.userProfileType = sessionStorage.getItem('userProfile');

  if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
    $location.path('/home');
    return;
  }

  $scope.availablePositions = [{
      selected: false,
      name: 'Guarda-Redes',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Libero',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Defesa Central',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Defesa Lateral',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Médio Defensivo',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Médio Ofensivo',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Extremo',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Avançado',
      esqSelected : false,
      dirSelected : false
    }, {
      selected: false,
      name: 'Ponta de Lança',
      esqSelected : false,
      dirSelected : false
    }];

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

  if(sessionStorage.getItem('staffMember') != undefined &&
    sessionStorage.getItem('staffMember') != '' &&
    sessionStorage.getItem('staffMember') == 'true') {
    $scope.addStaffMember = true;
  } else {
    $scope.addStaffMember = false;
  }

  //load the values with the selected team
  if(sessionStorage.getItem('selectedTeamId') != undefined &&
      sessionStorage.getItem('selectedTeamId') != '') {
      console.log('changing team id');
      $scope.teamId = sessionStorage.getItem('selectedTeamId');
      sessionStorage.setItem('otherTeamView', false);
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

  $scope.selectedPlayerPosition = function(value) {
    if($scope.selectedPlayer == undefined) {
      $scope.selectedPlayer = { position : '' };
    }
    $scope.selectedPlayer.position = value;
  }

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
        || a.position.includes('Wing') || a.position.includes('Central') || a.position.includes('Midfield')
        || a.position.includes('Médio')) {
        $scope.middles[middlesIndex] = a;
        middlesIndex++;
        playerConfirmation = true;
      } else if (a.position.includes('Back') || a.position.includes('Defensive') || a.position.includes('Defesa')) {
        $scope.defenses[defensesIndex] = a;
        defensesIndex++;
        playerConfirmation = true;
      } else if (a.position.includes('Forward') || a.position.includes('Striker') || a.position.includes('Avançado')
          || a.position.includes('Extremo') || a.position.includes('Ponta')) {
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
    //to avoid cookie overflow
    player.pictureBlob = '';
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
    if($scope.selectedPlayer != undefined) {
      if($scope.selectedPlayer.dateOfBirth != '' && $scope.selectedPlayer.dateOfBirth != undefined) {
        var birthdate = new Date($scope.selectedPlayer.dateOfBirth);
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff/31557600000);
        $scope.selectedPlayer.age = age;
      }

      if($scope.selectedPlayer.attributesId != '' &&
      $scope.selectedPlayer.attributesId != null) {
        $scope.loadValuesPlayerValues($scope.selectedPlayer.attributesId);
      }
    }

    $cookies.remove('selectedPlayer');
    $cookies.remove('readOnly');
  };



  //DELETE PLAYER
  $scope.deletePlayer = function() {
    if($scope.selectedPlayer.position.includes('Keeper') || $scope.selectedPlayer.position.includes('Guarda')) {
      var index = $scope.goalKeepers.indexOf($scope.selectedPlayer);
      $scope.goalKeepers.splice(index, 1);
    } else if (($scope.selectedPlayer.position.includes('Centre') &&
        !$scope.selectedPlayer.position.includes('Forward')) ||
        $scope.selectedPlayer.position.includes('Wing') ||
        $scope.selectedPlayer.position.includes('Médio')) {
      var index = $scope.middles.indexOf($scope.selectedPlayer);
      $scope.middles.splice(index, 1);
    } else if ($scope.selectedPlayer.position.includes('Back') ||
        $scope.selectedPlayer.position.includes('Defensive') ||
            $scope.selectedPlayer.position.includes('Defesa')) {
       var index = $scope.defenses.indexOf($scope.selectedPlayer);
       $scope.defenses.splice(index, 1);
    } else if ($scope.selectedPlayer.position.includes('Forward') ||
        $scope.selectedPlayer.position.includes('Striker') ||
            $scope.selectedPlayer.position.includes('Avançado') ||
                $scope.selectedPlayer.position.includes('Ponta')) {
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

  //  if(!validateIfFieldsAreCorrect() && $scope.addStaffMember != true) {
  //    alert('Por favor, preencha os campos todos!');
  //    return;
  //  }

    for(var i = 0; i < document.getElementById('avatar-2').files.length; i++) {
      if(document.getElementById('avatar-2').files[i].size/1024 > 100) {
        alert('Por favor, coloque uma imagem inferior a 100kb. A atual tem ' +
          (document.getElementById('avatar-2').files[i].size/1024 + "").substring(0, 5) + 'kb.');
        return;
      }
      document.getElementById('avatar-2').files[i].name = $scope.selectedPlayer.name + '.jpg';
      document.getElementById('avatarImageSourceId').title = $scope.selectedPlayer.name;
      $scope.selectedPlayer.pictureBlob = document.getElementById('avatarImageSourceId').src;
    }

    //it exists
    if($scope.selectedPlayer.$$hashKey != null && $scope.selectedPlayer.$$hashKey != '') {
        if($scope.selectedPlayer.position.includes('Keeper') || $scope.selectedPlayer.position.includes('Guarda')) {
          var index = $scope.goalKeepers.indexOf($scope.selectedPlayer);
          $scope.goalKeepers.splice(index, 1);
          $scope.goalKeepers.push(index, $scope.selectedPlayer);
        } else if (($scope.selectedPlayer.position.includes('Centre') &&
            !$scope.selectedPlayer.position.includes('Forward')) ||
            $scope.selectedPlayer.position.includes('Wing') ||
            $scope.selectedPlayer.position.includes('Médio')) {
          var index = $scope.middles.indexOf($scope.selectedPlayer);
          $scope.middles.splice(index, 1);
          $scope.middles.push(index, $scope.selectedPlayer);
        } else if ($scope.selectedPlayer.position.includes('Back') ||
            $scope.selectedPlayer.position.includes('Defensive') ||
                $scope.selectedPlayer.position.includes('Defesa')) {
           var index = $scope.defenses.indexOf($scope.selectedPlayer);
           $scope.defenses.splice(index, 1);
           $scope.defenses.push(index, $scope.selectedPlayer);
        } else if ($scope.selectedPlayer.position.includes('Forward') ||
            $scope.selectedPlayer.position.includes('Striker') ||
                $scope.selectedPlayer.position.includes('Avançado') ||
                    $scope.selectedPlayer.position.includes('Ponta')) {
          var index = $scope.strikers.indexOf($scope.selectedPlayer);
          $scope.strikers.splice(index, 1);
          $scope.strikers.push(index, $scope.selectedPlayer);
        }
    } else {
      if($scope.selectedPlayer.position.includes('Keeper')|| $scope.selectedPlayer.position.includes('Guarda')) {
        $scope.goalKeepers.push($scope.selectedPlayer);
      } else if (($scope.selectedPlayer.position.includes('Centre') &&
          !$scope.selectedPlayer.position.includes('Forward')) ||
          $scope.selectedPlayer.position.includes('Wing') ||
          $scope.selectedPlayer.position.includes('Médio')) {
        $scope.middles.push($scope.selectedPlayer);
      } else if ($scope.selectedPlayer.position.includes('Back') ||
          $scope.selectedPlayer.position.includes('Defensive') ||
              $scope.selectedPlayer.position.includes('Defesa')) {
         $scope.defenses.push($scope.selectedPlayer);
      } else if ($scope.selectedPlayer.position.includes('Forward') ||
          $scope.selectedPlayer.position.includes('Striker') ||
              $scope.selectedPlayer.position.includes('Avançado') ||
                  $scope.selectedPlayer.position.includes('Ponta')) {
        $scope.strikers.push($scope.selectedPlayer);
      }
    }


    if($scope.addStaffMember == true) {
        $scope.selectedPlayer.teamId = $scope.teamId;
        $scope.selectedPlayer.attributesId = '';
        if($scope.selectedPlayer.contractUntil == undefined || $scope.selectedPlayer.contractUntil == '') {
          var date = new Date();
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();
          $scope.selectedPlayer.contractUntil = $.datepicker.formatDate("yy-mm-dd", new Date(y+10, m, d, 0, 0));
        }

        $scope.selectedPlayer.marketValue = '';

        if($scope.selectedPlayer.playerId != null && $scope.selectedPlayer.playerId != '' &&
          $scope.selectedPlayer.playerId != undefined) {
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
        return;
      } else {
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
          return;
      }
    }


    //it exists
    if($scope.selectedPlayer.playerId != undefined &&
      $scope.selectedPlayer.playerId != null && $scope.selectedPlayer.playerId != '') {

      if($scope.selectedPlayer.attributesId != '' && $scope.selectedPlayer.attributesId != undefined &&
        $scope.selectedPlayer.attributesId != null) {
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

                        if($scope.selectedPlayer.contractUntil == undefined || $scope.selectedPlayer.contractUntil == '') {
                          var date = new Date();
                          var d = date.getDate();
                          var m = date.getMonth();
                          var y = date.getFullYear();
                          $scope.selectedPlayer.contractUntil = $.datepicker.formatDate("yy-mm-dd", new Date(y+10, m, d, 0, 0));
                        }

                        $scope.selectedPlayer.marketValue = '';

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
                    }

                  });
         });
      }

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

    if(id != undefined && id != '') {
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

        $scope.selectedPlayer.pictureBlob = data[0].pictureBlob;

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

    if($scope.selectedPlayer.pictureBlob != '' && $scope.selectedPlayer.pictureBlob != null &&
      $scope.selectedPlayer.pictureBlob != undefined) {
        document.getElementById('avatarImageSourceId').title = $scope.selectedPlayer.name;
        document.getElementById('avatarImageSourceId').src = $scope.selectedPlayer.pictureBlob;
      }
  }



  $scope.addPositionsToPlayer = function() {
    $scope.selectedPlayer.position = '';
    for(var i = 0; i < $scope.availablePositions.length; i++) {
      if($scope.availablePositions[i].selected) {
        if($scope.selectedPlayer.position != '') {
            $scope.selectedPlayer.position += ', ';
          }
          $scope.selectedPlayer.position += $scope.availablePositions[i].name;
          if($scope.availablePositions[i].esqSelected) {
            $scope.selectedPlayer.position += ' Esquerdo';
          }
          if($scope.availablePositions[i].dirSelected) {
            $scope.selectedPlayer.position += ' Direito';
          }
        }
    }
  };

  $scope.selectPlayerPosition = function() {
    console.log($scope.availablePositions);

    ngDialog.open({
      template: 'selectPlayerPosition.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      showClose: false,
      height: 300
    });
  };

  function validateIfFieldsAreCorrect() {
    return $scope.physicalHeight != '' &&  $scope.physicalHeight != undefined &&
    $scope.physicalResist != '' &&  $scope.physicalResist != undefined &&
    $scope.physicalAgility != '' &&  $scope.physicalAgility != undefined &&
    $scope.physicalJumpHeight != '' &&  $scope.physicalJumpHeight != undefined &&
    $scope.physicalJumpLong != '' &&  $scope.physicalJumpLong != undefined &&
    $scope.acelaration != '' &&  $scope.acelaration != undefined &&
    $scope.velocity10m != '' &&  $scope.velocity10m != undefined &&
    $scope.velocity20m != '' &&  $scope.velocity20m != undefined &&
    $scope.velocity50m != '' &&  $scope.velocity50m != undefined &&
    $scope.velocity100m != '' &&  $scope.velocity100m != undefined &&
    $scope.mentalLeadership != '' &&  $scope.mentalLeadership != undefined &&
    $scope.mentalTeam != '' &&  $scope.mentalTeam != undefined &&
    $scope.mentalTeamWork != '' &&  $scope.mentalTeamWork != undefined &&
    $scope.mentalDetermination != '' &&  $scope.mentalDetermination != undefined &&
    $scope.mentalCreativity != '' &&  $scope.mentalCreativity != undefined &&
    $scope.mentalFocus != '' &&  $scope.mentalFocus
    $scope.mentalAgressive != '' &&  $scope.mentalAgressive != undefined &&
    $scope.technicalCruzamento != '' &&  $scope.technicalCruzamento != undefined &&
    $scope.technicalDrible != '' &&  $scope.technicalDrible != undefined &&
    $scope.technicalWork != '' &&  $scope.technicalWork != undefined &&
    $scope.technicalShoot != '' &&  $scope.technicalShoot
    $scope.technicalFinish != '' &&  $scope.technicalFinish
    $scope.technicalHead != '' &&  $scope.technicalHead != undefined &&
    $scope.technicalFirst != '' &&  $scope.technicalFirst != undefined &&
    $scope.technicalReceive != '' &&  $scope.technicalReceive != undefined &&
    $scope.technicalFree != '' &&  $scope.technicalFree != undefined &&
    $scope.technicalLaunch != '' &&  $scope.technicalLaunch != undefined &&
    $scope.technicalPenalty != '' &&  $scope.technicalPenalty != undefined &&
    $scope.technicalCorner != '' &&  $scope.technicalCorner != undefined &&
    $scope.technicalTech != '' &&  $scope.technicalTech != undefined &&
    $scope.technicalShortPass != '' &&  $scope.technicalShortPass != undefined &&
    $scope.technicalLongPass != '' &&  $scope.technicalLongPass != undefined &&
    $scope.technicalLongShoot != '' &&  $scope.technicalLongShoot != undefined;
  }

  $scope.hideElements = function() {
    if(!$scope.otherTeamView) {
        var edit = document.getElementsByClassName('playerEdit');

        for(var i = 0; i < edit.length; i++) {
          edit[i].style.display = 'none';
        }
    } else {
      if($scope.userProfileType == 'manager' || $scope.userProfileType == 'player') {
        var edit = document.getElementsByClassName('playerEdit');

        for(var i = 0; i < edit.length; i++) {
          edit[i].style.display = 'none';
        }
      }
    }
  };
});
