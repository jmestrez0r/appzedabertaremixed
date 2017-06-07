angular.module('Elifoot').controller('PopUpController', function($scope, ngDialog, Practices) {
  $scope.data = {
      message : '',
      nearPractice : '',
      nearShow : false,
      todaysPractices: '',
      todaysShow : false
   };

  $scope.validateAlertMessage = function() {
      Practices.nearPractice().success(
          function(data) {
            $scope.data.nearPractice = data;
            console.log(data);
          });

      Practices.todaysPractices().success(
          function(data) {
            $scope.data.todaysPractices = data;
            console.log(data);
          });

      if($scope.data.nearPractice != null && $scope.data.nearPractice != '') {
        $scope.data.message = "Treino de " + $scope.data.nearPractice.type + " agora!";
        $scope.data.nearShow = true;
      } else {
        if($scope.data.todaysPractice != null && $scope.data.todaysPractice > 0) {
          $scope.data.message = "Tem um treino hoje às " + $scope.data.todaysPractices.datetime
            + " de " + $scope.data.todaysPractices.type + "!";
          $scope.data.todaysShow = true;
        }
      }

      //ngDialog.open({ template: 'alertTemplate' });

      return $scope.data;
      };
  });
