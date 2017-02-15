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

  $scope.status = "Working...";
  $scope.progress = 0;
  $scope.labels = [
    "Installing start menu items",
    "Registering components",
    "Having a coffee"
  ];
  var i = -1;
  function update() {
    $scope.progress += random(0, 10);
    if ($scope.progress > random(70, 90)) {
      $scope.progress = random(5, 50);
      i = (i + 1) % $scope.labels.length;
      $scope.status = $scope.labels[i];
    }
    $timeout(update, 200);
  }
  function random(a, b) {
    return a + Math.floor(Math.random() * (b - a));
  }
  update();

  $scope.progress = function(barClick){
    if(barClick == 'equipa') {
      $scope.dynamicEquipa = $scope.dynamicEquipa + 10;
    } else if(barClick == 'resist') {
      $scope.dynamicResist = $scope.dynamicResist + 10;
    } else if(barClick == 'final') {
      $scope.dynamicFinal = $scope.dynamicFinal + 10;
    }
  };
});
