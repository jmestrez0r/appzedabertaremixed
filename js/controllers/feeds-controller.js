angular.module("Elifoot").controller('FeedsController', function($scope, $cookies, Feeds, ngDialog, CalendarInformation, Practices, TeamPlayers) {

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
      $scope.feeds = [];
      var currentDate = moment().format('YYYY/MM/DD');
      for(var i = 0; i < data.items.length; i++) {
        if(moment(data.items[i].pubDate).format('YYYY/MM/DD') == currentDate) {
          $scope.feeds.push(data.items[i]);
        } else {
          console.log($scope.feeds);
          return;
        }
      }
  });

  $scope.data = {
      message : '',
      nearPractice : '',
      nearShow : false,
      todaysPractices: '',
      todaysShow : false,
      nearByGame: '',
      nearByGameShow : false
   };

  $scope.validateAlertMessage = function() {

      //verify if there are any GAMES near by!
      CalendarInformation.getNearByEventByType($scope.teamId, 'game').success(function (data) {
        console.log('Checking near by games... ' + data);
        $scope.data.nearByGame = data[0];

        $scope.nearEventDetail;

        if($scope.data.nearByGame != null && $scope.data.nearByGame != undefined &&
          $scope.data.nearByGame != '') {
            $scope.data.message = "Mister, tem jogo muito em breve!";
            $scope.data.nearByGameShow = true;
            $cookies.putObject('selectedGameId', $scope.data.nearByGame.eventId);
            loadAlertDialog();
            $scope.nearEventDetail = $scope.data.nearByGame;
          } else {
            //verify if there are any PRACTICES near by!
            CalendarInformation.getNearByEventByType($scope.teamId, 'practice').success(function (data) {
              console.log('Checking near by practices... ' + data);
              $scope.data.nearPractice = data[0];

              if($scope.data.nearPractice != null && $scope.data.nearPractice != undefined &&
                $scope.data.nearPractice != '') {
                  $scope.data.message = "Mister, tem treino agora!";
                  $scope.data.nearShow = true;
                  sessionStorage.setItem('selectedPractice', $scope.data.nearPractice.identification);
                  loadAlertDialog();
                  $scope.nearEventDetail = $scope.data.nearPractice;
              } else {
                //verify if there are any GAMES today
                CalendarInformation.getTodaysEventsByType($scope.teamId, 'practice').success(function (data) {
                  console.log('At last, checking todays practices... ' + data);
                  $scope.data.todaysPractices = data[0];

                  if($scope.data.todaysPractices != null && $scope.data.todaysPractices != undefined &&
                    $scope.data.todaysPractices != '') {
                      $scope.data.message = "Tem um treino hoje às " + moment($scope.data.todaysPractices.startDate).format('HH:MM')
                        + " de " + $scope.data.todaysPractices.title + "!";
                      $scope.data.todaysShow = true;
                      loadAlertDialog();
                      $scope.nearEventDetail = $scope.data.todaysPractices;
                  }
                });
              }
            });
          }
      });
    };

    function loadAlertDialog() {
      ngDialog.open({
        template: 'alertTemplate.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: false,
        height: 300,
        weight: 800
      });
    }

    //TODO
    $scope.showPracticeData = function() {
      ngDialog.open({
        template: 'practiceDetail.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: false,
        height: '300px',
        width: '800px'
      });
    };

    //TODO
    $scope.showPracticesList = function() {
      Practices.getTodaysPractices($scope.teamId).success(function (data) {
        console.log('Todays practices... ' + data);
        $scope.practicesList = data[0];

        if($scope.practicesList.length > 0) {
          ngDialog.open({
            template: 'practiceList.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            showClose: false,
            height: '400px',
            width: '800px'
          });
        } else {
          alert('No practices today!');
        }
      });
    }

    $scope.loadInitialValues = function() {
      var startOfWeek = new Date();
      var endOfWeek   = moment().endOf('isoweek').toDate();

      $scope.practicesThisWeek = CalendarInformation.getEventsCountByType(
          $scope.teamId,
          'practice',
          startOfWeek,
          endOfWeek).success(function (data) {
        $scope.practicesThisWeek = data[0].eventsThisWeek;
        console.log("You have " + $scope.practicesThisWeek + " practices until the remaining of this week.");
      });

      $scope.eventsThisWeek = CalendarInformation.getEventsCountByType(
          $scope.teamId,
          '',
          startOfWeek,
          endOfWeek).success(function (data) {
        $scope.eventsThisWeek = data[0].eventsThisWeek;
        console.log("You have " + $scope.eventsThisWeek + " events this week.");
      });
    };

    $scope.loadPracticeDetailsAndConfig = function() {
      sessionStorage.getItem('selectedPractice');
    };
});
