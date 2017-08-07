angular.module("Elifoot").controller('TeamPlayersController', function($scope, $timeout, TeamPlayers, ngDialog) {

  $scope.selectedPlayer = '';
  $scope.goalKeepers = [];
  $scope.defenses = [];
  $scope.middles = [];
  $scope.strikers = [];

  $scope.leagueTable = sessionStorage.getItem('leagueTable');
  $scope.teamId = sessionStorage.getItem('teamId');
  $scope.effectiveTeamName = sessionStorage.getItem('effectiveTeamName');
  $scope.selectedTeamId = sessionStorage.getItem('selectedTeamId');

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
    for(var i = 0; i < data.teams.length; i++) {
      if(data.teams[i].name == $scope.effectiveTeamName) {
        $scope.effectiveTeam = data.teams[i];
        console.log($scope.effectiveTeam);
        return;
      }
    }
  });

  $scope.dynamicFinal = 0;
  $scope.dynamicResist = 0;
  $scope.dynamicEquipa = 0;
  $scope.max = 100;

  $scope.progress = function(barClick){
    if(!$scope.details) {
      if(barClick == 'equipa') {
        $scope.dynamicEquipa = $scope.dynamicEquipa + 10;
        if($scope.dynamicEquipa > 100) {
          $scope.dynamicEquipa = 0;
        }
      } else if(barClick == 'resist') {
        $scope.dynamicResist = $scope.dynamicResist + 10;
        if($scope.dynamicResist > 100) {
          $scope.dynamicResist = 0;
        }
      } else if(barClick == 'final') {
        $scope.dynamicFinal = $scope.dynamicFinal + 10;
        if($scope.dynamicFinal > 100) {
          $scope.dynamicFinal = 0;
        }
      }
    }
  };

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

    //dummy dynamic values TODO
    $scope.dynamicEquipa = 25;
    $scope.dynamicFinal = 85;
    $scope.dynamicResist = 60;

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
});
