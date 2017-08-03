angular.module("Elifoot").controller('ClassificationController', function($scope, Classification) {

  $scope.teamMap;
  $scope.selectedTeamId;

  Classification.all().success(function(data) {
      $scope.classification = data;
      Classification.getAvailableTeams().success(function(data2) {
          $scope.teamMap = data2.teams;
          console.log(data2);
      });
      console.log(data);
  });

  $scope.setSelectedTeam = function(teamName) {
    for(var i = 0; i < $scope.teamMap.length; i++) {
      if($scope.teamMap[i].name == teamName) {
        $scope.selectedTeamId = i;
        return ;
      }
    }
  };
});
