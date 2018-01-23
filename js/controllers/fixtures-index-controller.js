angular.module("Elifoot").controller('FixturesController', function($scope, Fixtures, $location) {

  // INITIAL LOGIN module
  $scope.username = sessionStorage.getItem('user');
  $scope.password;

  if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
    $location.path('/home');
    return;
  }

  var teamId = sessionStorage.getItem('teamId');

  Fixtures.all(teamId).success(function(data) {
    console.log(data);
    $scope.gamesList = data.fixtures;
  });
});
