angular.module("Elifoot").controller('LeaguesIndexController', function($scope, Leagues, $location) {

  // INITIAL LOGIN module
  $scope.username = sessionStorage.getItem('user');
  $scope.password;

  if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
    $location.path('/home');
    return;
  }

  
  Leagues.all().success(function(data) {
      $scope.leagues = data;
      console.log(data);
  });
});
