angular.module("Elifoot").controller('ClassificationController', function($scope, Classification, TeamPlayers, $location) {

  // INITIAL LOGIN module
  $scope.username = sessionStorage.getItem('user');
  $scope.password;

  if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
    $location.path('/home');
    return;
  }

  $scope.teamMap;
  $scope.leagueTable = sessionStorage.getItem('leagueTable');

  Classification.all($scope.leagueTable).success(function(data) {
      $scope.classification = data;
      Classification.getAvailableTeams($scope.leagueTable).success(function(data2) {
          $scope.teamMap = data2.teams;
          console.log(data2);
      });
      console.log(data);
  });

  $scope.setSelectedTeam = function(teamName, disable) {
    for(var i = 0; i < $scope.teamMap.length; i++) {
      if($scope.teamMap[i].name == teamName) {
        $scope.selectedTeamId = $scope.teamMap[i]._links.players.href.replace('http://api.football-data.org/v1/teams/', '');
        $scope.selectedTeamId = $scope.selectedTeamId.replace('/players', '');
        sessionStorage.setItem('selectedTeamId', $scope.selectedTeamId);
        sessionStorage.setItem('selectedEffectiveTeamName', teamName);
        sessionStorage.setItem('otherTeamView', false);
        console.log("selected Team id " + $scope.selectedTeamId);
        return ;
      }
    }
  };

  $scope.showPlayersPage = function() {
    //redirect to page
    $scope.selectedTeamId = sessionStorage.getItem('selectedTeamId');
    TeamPlayers.all($scope.selectedTeamId).success(function(data) {
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
      //redirect to page
    };
});
