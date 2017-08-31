angular.module("Elifoot").controller('FixturesController', function($scope, Fixtures) {

  var teamId = sessionStorage.getItem('teamId');
  
  Fixtures.all(teamId).success(function(data) {
    console.log(data);
    $scope.gamesList = data.fixtures;
  });
});
