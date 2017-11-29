angular.module("Elifoot").controller('FeedsController', function($scope, $cookies, Feeds, ngDialog, CalendarInformation, Practices, TeamPlayers) {

  //initial configuration;
  sessionStorage.setItem('user', 'José Amador');

  //it's necessary to create a record in TEAM table with this ID
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

  $scope.refreshCookies = function () {
    $cookies.remove('selectedGameDescription');
    $cookies.remove('selectedGameId');
    $cookies.remove('selectedGameDate');
    $cookies.remove('selectedPlayer');
  }

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
      nearByGameShow : false,
      nearByMeeting: '',
      nearByMeetingShow : true
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
            sessionStorage.setItem('selectedGameId', $scope.data.nearByGame.eventId);
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
                  sessionStorage.setItem('selectedGameId', $scope.data.nearPractice.eventId);
                  sessionStorage.setItem('selectedGameDate', $scope.data.nearPractice.startDate);
                  sessionStorage.setItem('selectedGameDescription', $scope.data.nearPractice.title);
                  loadAlertDialog();
                  $scope.nearEventDetail = $scope.data.nearPractice;
              } else {
                //verify if there are any GAMES today
                CalendarInformation.getTodaysEventsByType($scope.teamId, 'practice').success(function (data) {
                  console.log('At last, checking todays practices... ' + data);
                  $scope.data.todaysPractices = data[0];

                  if($scope.data.todaysPractices != null && $scope.data.todaysPractices != undefined &&
                    $scope.data.todaysPractices != '') {
                      $scope.data.message = "Tem um treino às " + moment($scope.data.todaysPractices.startDate).format('HH:MM')
                        + " do dia " + moment($scope.data.todaysPractices.startDate).format('DD') + " de " + $scope.data.todaysPractices.title + "!";
                      $scope.data.todaysShow = true;
                      loadAlertDialog();
                      $scope.nearEventDetail = $scope.data.todaysPractices;
                  } else {
                    //verify if there are any GAMES today
                    CalendarInformation.getTodaysEventsByType($scope.teamId, 'meeting').success(function (data) {
                      console.log('At last, checking todays meetings... ' + data);
                      $scope.data.nearByMeeting = data[0];
                      if($scope.data.nearByMeeting != null && $scope.data.nearByMeeting != undefined &&
                        $scope.data.nearByMeeting != '') {
                          $scope.data.nearByMeetingShow = false;
                          $scope.data.message = "Tem uma reunião brevemente, verifique o seu calendário.";
                          loadAlertDialog();
                        }
                    });
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

    $scope.showPracticesList = function() {
      var startOfWeek = moment().startOf('week').toDate();
      var endOfWeek   = moment().endOf('week').toDate();

      CalendarInformation.getPracticesList($scope.teamId, startOfWeek, endOfWeek).success(function (data) {
        console.log('Practices list... ' + data);
        $scope.practicesList = data;

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
          alert('No practices this week!');
        }
      });
    }

    $scope.loadInitialValues = function() {
      var startOfWeek = moment().startOf('week').toDate();
      var endOfWeek   = moment().endOf('week').toDate();

      $scope.practicesThisWeek = CalendarInformation.getEventsCountByType(
          $scope.teamId,
          'practice',
          startOfWeek,
          endOfWeek).success(function (data) {
        $scope.practicesThisWeek = data[0].eventsThisWeek;
        console.log("You have " + $scope.practicesThisWeek + " practices this week.");
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

    $scope.chartData = [];
    $scope.chartLabels = [];

    $scope.loadStatsGraph = function() {
        if($scope.chartData.length == 0) {
          CalendarInformation.getLastGameStats($scope.teamId).success(function (data) {
              if($scope.chartData.length == 0) {
                var homeTeam = [];
                var otherTeam = [];
                for(var i = 0; i < data.length; i++) {
                  homeTeam.push(data[0].successPass); $scope.chartLabels.push( 'Passe');
                  homeTeam.push(data[0].crossingPass); $scope.chartLabels.push( 'Cruzamento');
                  homeTeam.push(data[0].ballWon); $scope.chartLabels.push( 'Bolas ganhas');
                  homeTeam.push(data[0].heading); $scope.chartLabels.push( 'Cabeceamento');
                  homeTeam.push(data[0].disarm); $scope.chartLabels.push( 'Desarme');
                  homeTeam.push(data[0].drible); $scope.chartLabels.push( 'Drible');
                  homeTeam.push(data[0].shootSide); $scope.chartLabels.push( 'Remates ao Lado');
                  homeTeam.push(data[0].shootGoal); $scope.chartLabels.push( 'Remates a Golo');
                  homeTeam.push(data[0].interceptedShoot); $scope.chartLabels.push( 'Remates Interceptados');
                  homeTeam.push(data[0].goal); $scope.chartLabels.push( 'Golos');
                  homeTeam.push(data[0].failedPass); $scope.chartLabels.push( 'Passes Falhados');
                  homeTeam.push(data[0].failedCrossingPass); $scope.chartLabels.push( 'Cruzamentos Falhados');
                  homeTeam.push(data[0].ballFailed); $scope.chartLabels.push( 'Bolas Falhadas');
                  homeTeam.push(data[0].foul); $scope.chartLabels.push( 'Faltas');
                  homeTeam.push(data[0].yellowCard); $scope.chartLabels.push( 'Cartões Amarelos');
                  homeTeam.push(data[0].redCard); $scope.chartLabels.push( 'Cartões Vermelhos');
                  homeTeam.push(data[0].selfGoal); $scope.chartLabels.push( 'Auto-golos');
                  homeTeam.push(data[0].offside); $scope.chartLabels.push( 'Foras de Jogo');
                  homeTeam.push(data[0].assist); $scope.chartLabels.push( 'Assitências');
                  homeTeam.push(data[0].wonHeading); $scope.chartLabels.push( 'Cabeceamentos ganhos');

                  $scope.chartData.push(homeTeam);
                  //TODO
                  //$scope.chartData.push(otherTeam);
                }
              }
          });
        }
    };

});
