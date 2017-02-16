angular.module("Elifoot").controller('TeamPlayersController', function($scope, $timeout, TeamPlayers) {

  TeamPlayers.all().success(function(data) {
      $scope.teamPlayers = data;
      console.log(data);
  });

  TeamPlayers.effectiveTeam().success(function (data) {
    $scope.effectiveTeam = data;
    console.log(data);
  });

  $scope.dynamicFinal = 0;
  $scope.dynamicResist = 0;
  $scope.dynamicEquipa = 0;
  $scope.max = 100;

  $scope.progress = function(barClick){
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
  };
});
