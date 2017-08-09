angular.module("Elifoot").controller('FeedsController', function($scope, Feeds, ngDialog, Practices, TeamPlayers) {

  //initial configuration;
  sessionStorage.setItem('user', 'José Amador');
  sessionStorage.setItem('leagueTable', '445');
  sessionStorage.setItem('teamId', '57');
  sessionStorage.setItem('effectiveTeamName', 'Arsenal FC');
  sessionStorage.setItem('selectedTeamId', '');
  sessionStorage.setItem('X-Auth-Token', 'db1386cd081342f8a0339d58d7a174e3');

  $scope.leagueTable = sessionStorage.getItem('leagueTable');
  $scope.teamId = sessionStorage.getItem('teamId');
  $scope.user = sessionStorage.getItem('user');
  TeamPlayers.teamDetail($scope.teamId).success(function(data) {
    $scope.crestUrl = data.crestUrl;
  });

  Feeds.parseFeed().success(function(data) {
      $scope.feeds = data
      console.log(data);
  });

  $scope.data = {
      message : '',
      nearPractice : '',
      nearShow : false,
      todaysPractices: '',
      todaysShow : false
   };

  $scope.validateAlertMessage = function() {
      $scope.data.nearPractice = Practices.nearPractice();
      $scope.data.todaysPractices = Practices.todaysPractices();

      console.log($scope.data.nearPractice);
      console.log($scope.data.todaysPractices);

      if($scope.data.nearPractice != null && $scope.data.nearPractice != '') {
        $scope.data.message = "Mister, tem treino agora!";
        $scope.data.nearShow = true;
      } else {
        if($scope.data.todaysPractice != null && $scope.data.todaysPractice > 0) {
          $scope.data.message = "Tem um treino hoje às " + $scope.data.todaysPractices.datetime
            + " de " + $scope.data.todaysPractices.type + "!";
          $scope.data.todaysShow = true;
        }
      }

      ngDialog.open({
        template: 'alertTemplate.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: false,
        height: 300,
        weight: 800
      });

      return $scope.data;
    };
});
