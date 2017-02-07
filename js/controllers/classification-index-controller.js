angular.module("Elifoot").controller('ClassificationController', function($scope, Classification) {

  Classification.all().success(function(data) {
      $scope.classification = data
      console.log(data);
  });
});
