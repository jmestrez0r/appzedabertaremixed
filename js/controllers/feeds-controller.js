angular.module("Elifoot").controller('FeedsController', function($scope, Feeds) {
  Feeds.parseFeed().success(function(data) {
      $scope.feeds = data
      console.log(data);
  });
});
