angular.module("Elifoot").controller('LeaguesIndexController', function($scope, Leagues) {

  Leagues.all().success(function(data) {
      $scope.leagues = data;
      console.log(data);
  });
});
