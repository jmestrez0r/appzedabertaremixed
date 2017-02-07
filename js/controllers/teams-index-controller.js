angular.module("Elifoot").controller('TeamPlayersController', function($scope, TeamPlayers) {

  TeamPlayers.all().success(function(data) {
      $scope.teamPlayers = data;
      console.log(data);
  });

  TeamPlayers.effectiveTeam().success(function (data) {
    $scope.effectiveTeam = data;
    console.log(data);
  });

});
