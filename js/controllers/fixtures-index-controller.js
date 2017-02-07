angular.module("Elifoot").controller('FixturesController', function($scope, Fixtures) {

  Fixtures.all().success(function(data) {
      $scope.fixtures = data
      console.log(data);
  });
});
