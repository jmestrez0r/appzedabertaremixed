angular.module("Elifoot").controller('PopUpController', function($scope, Practices) {

  $scope.showModal = false;
  $scope.message = '';
  $scope.nearPractice;
  $scope.todaysPractices;

  $scope.validateAlertMessage = function() {
      $scope.nearPractice = Practices.nearPractice(Date.now());
      $scope.todaysPractices = Practices.todaysPractices(Date.now());

      if($scope.nearPractice != null) {
        $scope.message = "Treino de " + $scope.nearPractice.type + " agora!";
        $scope.showModal = true;
      }

      if($scope.todaysPractice != null && $scope.todaysPractice > 0) {
        $scope.message = "Tem um treino hoje às " + $scope.todaysPractices.datetime
          + " de " + $scope.todaysPractices.type + "!";
        $scope.showModal = true;
      }
      return $scope.showModal;
  };
});
