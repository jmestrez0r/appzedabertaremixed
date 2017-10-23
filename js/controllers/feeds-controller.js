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

    $scope.loadPracticeDetailsAndConfig = function() {
      sessionStorage.getItem('selectedPractice');
    };

    $scope.chartData = [];

    $scope.loadStatsGraph = function() {
      if($scope.chartData.length > 0) {

      }
    }

    $scope.loadAreaChart = function() {
      var thisStartedMonth = moment().format('YYYY/MM');

      for(var i = 0; i < 5; i++) {
        var startDate = moment().startOf('month').subtract(i, 'months').format('YYYY/MM/DD');
        var endDate = moment().endOf('month').subtract(i, 'months').format('YYYY/MM/DD');

        CalendarInformation.getEventsCountByTypeStatistics($scope.teamId, startDate, endDate).success(
            function (data) {
          var ocurrenciasJogos = 0;
          var ocurrenciasReunioes = 0;
          var ocorrenciasTreinos = 0;
          var dateTime = '';

          //check if everything is filled
          if(data[0] != '' && data[0] != undefined) {
            if(data[0].occurrences != undefined) {
              if(data[0].type == 'game') {
                ocurrenciasJogos = data[0].occurrences;
              } else if(data[0].type == 'meeting') {
                ocurrenciasReunioes = data[0].occurrences;
              } else if(data[0].type == 'practice') {
                ocorrenciasTreinos = data[0].occurrences;
              }
            }
            if(data[0].startDate != undefined) {
              dateTime = data[0].startDate;
            } else {
              dateTime = data;
            }
          }
          if(data[1] != '' && data[1] != undefined) {
            if(data[1].type == 'game') {
              ocurrenciasJogos = data[1].occurrences;
            } else if(data[1].type == 'meeting') {
              ocurrenciasReunioes = data[1].occurrences;
            } else if(data[1].type == 'practice') {
              ocorrenciasTreinos = data[1].occurrences;
            }
          }
          if(data[2] != '' && data[2] != undefined) {
            if(data[2].type == 'game') {
              ocurrenciasJogos = data[2].occurrences;
            } else if(data[2].type == 'meeting') {
              ocurrenciasReunioes = data[2].occurrences;
            } else if(data[2].type == 'practice') {
              ocorrenciasTreinos = data[2].occurrences;
            }
          }

          console.log('Getting month ' + moment(dateTime, 'YYYY/MM').format('YYYY/MM') + ' information');
          console.log(data);

          $scope.chartData.push({
             period: moment(dateTime, 'YYYY/MM').format('YYYY/MM'),
             jogos: ocurrenciasJogos,
             reunioes: ocurrenciasReunioes,
             treinos: ocorrenciasTreinos
          });

          if(sessionStorage.getItem('chartData') != undefined ||
            sessionStorage.getItem('chartData') != undefined) {
            sessionStorage.removeItem('chartData');
          }

          sessionStorage.setItem('chartData', JSON.stringify($scope.chartData));
        });
      }
    }

});
