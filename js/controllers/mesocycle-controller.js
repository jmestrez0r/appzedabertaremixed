angular.module("Elifoot").controller('MesocycleController',
  function($scope, Practices, $location) {

    // INITIAL LOGIN module
    $scope.username = sessionStorage.getItem('user');
    $scope.password;

    if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
      $location.path('/home');
      return;
    }

    $scope.week = 0; //this variable goes to 0 from 4
    $scope.weekLoopInside = 0;
    $scope.colors = ['#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1'];

    $scope.series = ['Tática', 'Intensidade', 'Volume', 'Density']; //séries
    $scope.seriesOTD = ['OO', 'OD', 'TD', 'TO'];
    $scope.labelsOfTheWeek = []; //dias da semana que sao variaveis durante o mes

    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.data = [
    //  [65, 59, 80, 81],
    //  [28, 48, 40, 19],
    //  [28, 48, 40, 19],
    //  [28, 48, 40, 19]
    ];
    $scope.rawValues = [];

    while($scope.week < 5) {
      //call db in order to get the information

      $scope.startWeek = moment(moment().startOf('month').add($scope.week*7, 'days').toDate()).startOf('isoWeek').toDate();
      $scope.endWeek = moment(moment().startOf('month').add($scope.week*7, 'days').toDate()).endOf('isoWeek').toDate();

      $scope.labelsOfTheWeek.push($scope.startWeek.getDate() + ' - ' + $scope.endWeek.getDate());

      //workaround to keep things on track
      setTimeout(function(){}, 3000);

      //Preenchimento das Datas após pedido à BD
      Practices.getPracticesOfATimelineToLoadTheGraphics($scope.startWeek, $scope.endWeek, $scope.teamId).success(function (data) {
        $scope.rawValues.push(data);
        if($scope.weekLoopInside == 4) {
          handleAllTheData();
          return;
        }
        $scope.weekLoopInside = $scope.weekLoopInside + 1;
      });
      $scope.week = $scope.week + 1;
    }


    function handleAllTheData() {
      var week1TacticTO = 0;
      var week2TacticTO = 0;
      var week3TacticTO = 0;
      var week4TacticTO = 0;
      var week5TacticTO = 0;
      var week1TacticTD = 0;
      var week2TacticTD = 0;
      var week3TacticTD = 0;
      var week4TacticTD = 0;
      var week5TacticTD = 0;
      var week1TacticOO = 0;
      var week2TacticOO = 0;
      var week3TacticOO = 0;
      var week4TacticOO = 0;
      var week5TacticOO = 0;
      var week1TacticOD = 0;
      var week2TacticOD = 0;
      var week3TacticOD = 0;
      var week4TacticOD = 0;
      var week5TacticOD = 0;

      var week1Density = 0;
      var week1Volume = 0;
      var week1Intensity = 0;
      var week1Frequency = 0;
      var week2Density = 0;
      var week2Volume = 0;
      var week2Intensity = 0;
      var week2Frequency = 0;
      var week3Density = 0;
      var week3Volume = 0;
      var week3Intensity = 0;
      var week3Frequency = 0;
      var week4Density = 0;
      var week4Volume = 0;
      var week4Intensity = 0;
      var week4Frequency = 0;
      var week5Density = 0;
      var week5Volume = 0;
      var week5Intensity = 0;
      var week5Frequency = 0;

      for(var i = 0; i < $scope.rawValues.length; i++) {
        var arrayWithData = $scope.rawValues[i];
        if(arrayWithData[0] != null && arrayWithData != undefined) {
          if(i == 0) {
            for(var j = 0; j < arrayWithData.length; j++) {
                var practiceDetail = arrayWithData[j];

                week1Frequency = parseInt(week1Frequency) + parseInt(practiceDetail.frequency);
                week1Volume = parseInt(week1Volume) + parseInt(practiceDetail.volume);
                week1Density = parseInt(week1Density) + parseInt(practiceDetail.density);

                if(practiceDetail.type.indexOf('Transição ofensiva') >= 0) { week1TacticTO = parseInt(week1TacticTO) + 1;}
                if(practiceDetail.type.indexOf('Transição defensiva') >= 0) { week1TacticTD = parseInt(week1TacticTD) + 1;}
                if(practiceDetail.type.indexOf('Organização ofensiva') >= 0) { week1TacticOO = parseInt(week1TacticOO) + 1;}
                if(practiceDetail.type.indexOf('Organização defensiva') >= 0) { week1TacticOD = parseInt(week1TacticOD) + 1;}

                if(practiceDetail.intensity.indexOf('Baixa') == 0) { week1Intensity = parseInt(week1Intensity) + 20;}
                else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { week1Intensity = parseInt(week1Intensity) + 40;}
                else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { week1Intensity = parseInt(week1Intensity) + 60;}
                else if(practiceDetail.intensity.indexOf('Alta') == 0) { week1Intensity = parseInt(week1Intensity) + 80;}
                else if(practiceDetail.intensity.indexOf('Máxima') == 0) { week1Intensity = parseInt(week1Intensity) + 100;}
            }
          } else if (i == 1) {
            for(var j = 0; j < arrayWithData.length; j++) {
                var practiceDetail = arrayWithData[j];

                week2Frequency = parseInt(week2Frequency) + parseInt(practiceDetail.frequency);
                week2Volume = parseInt(week2Volume) + parseInt(practiceDetail.volume);
                week2Density = parseInt(week2Density) + parseInt(practiceDetail.density);

                if(practiceDetail.type.indexOf('Transição ofensiva') >= 0) { week2TacticTO = parseInt(week2TacticTO) + 1;}
                if(practiceDetail.type.indexOf('Transição defensiva') >= 0) { week2TacticTD = parseInt(week2TacticTD) + 1;}
                if(practiceDetail.type.indexOf('Organização ofensiva') >= 0) { week2TacticOO = parseInt(week2TacticOO) + 1;}
                if(practiceDetail.type.indexOf('Organização defensiva') >= 0) { week2TacticOD = parseInt(week2TacticOD) + 1;}

                if(practiceDetail.intensity.indexOf('Baixa') == 0) { week2Intensity = parseInt(week2Intensity) + 20;}
                else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { week2Intensity = parseInt(week2Intensity) + 40;}
                else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { week2Intensity = parseInt(week2Intensity) + 60;}
                else if(practiceDetail.intensity.indexOf('Alta') == 0) { week2Intensity = parseInt(week2Intensity) + 80;}
                else if(practiceDetail.intensity.indexOf('Máxima') == 0) { week2Intensity = parseInt(week2Intensity) + 100;}
            }
          } else if (i == 2) {
            for(var j = 0; j < arrayWithData.length; j++) {
                var practiceDetail = arrayWithData[j];

                week3Frequency = parseInt(week3Frequency) + parseInt(practiceDetail.frequency);
                week3Volume = parseInt(week3Volume) + parseInt(practiceDetail.volume);
                week3Density = parseInt(week3Density) + parseInt(practiceDetail.density);

                if(practiceDetail.type.indexOf('Transição ofensiva') >= 0) { week3TacticTO = parseInt(week3TacticTO) + 1;}
                if(practiceDetail.type.indexOf('Transição defensiva') >= 0) { week3TacticTD = parseInt(week3TacticTD) + 1;}
                if(practiceDetail.type.indexOf('Organização ofensiva') >= 0) { week3TacticOO = parseInt(week3TacticOO) + 1;}
                if(practiceDetail.type.indexOf('Organização defensiva') >= 0) { week3TacticOD = parseInt(week3TacticOD) + 1;}

                if(practiceDetail.intensity.indexOf('Baixa') == 0) { week3Intensity = parseInt(week3Intensity) + 20;}
                else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { week3Intensity = parseInt(week3Intensity) + 40;}
                else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { week3Intensity = parseInt(week3Intensity) + 60;}
                else if(practiceDetail.intensity.indexOf('Alta') == 0) { week3Intensity = parseInt(week3Intensity) + 80;}
                else if(practiceDetail.intensity.indexOf('Máxima') == 0) { week3Intensity = parseInt(week3Intensity) + 100;}
            }
          } else if (i == 3) {
            for(var j = 0; j < arrayWithData.length; j++) {
                var practiceDetail = arrayWithData[j];

                week4Frequency = parseInt(week4Frequency) + parseInt(practiceDetail.frequency);
                week4Volume = parseInt(week4Volume) + parseInt(practiceDetail.volume);
                week4Density = parseInt(week4Density) + parseInt(practiceDetail.density);

                if(practiceDetail.type.indexOf('Transição ofensiva') >= 0) { week4TacticTO = parseInt(week4TacticTO) + 1;}
                if(practiceDetail.type.indexOf('Transição defensiva') >= 0) { week4TacticTD = parseInt(week4TacticTD) + 1;}
                if(practiceDetail.type.indexOf('Organização ofensiva') >= 0) { week4TacticOO = parseInt(week4TacticOO) + 1;}
                if(practiceDetail.type.indexOf('Organização defensiva') >= 0) { week4TacticOD = parseInt(week4TacticOD) + 1;}

                if(practiceDetail.intensity.indexOf('Baixa') == 0) { week4Intensity = parseInt(week4Intensity) + 20;}
                else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { week4Intensity = parseInt(week4Intensity) + 40;}
                else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { week4Intensity = parseInt(week4Intensity) + 60;}
                else if(practiceDetail.intensity.indexOf('Alta') == 0) { week4Intensity = parseInt(week4Intensity) + 80;}
                else if(practiceDetail.intensity.indexOf('Máxima') == 0) { week4Intensity = parseInt(week4Intensity) + 100;}
            }
          } else if (i == 4) {
            for(var j = 0; j < arrayWithData.length; j++) {
                var practiceDetail = arrayWithData[j];

                week5Frequency = parseInt(week5Frequency) + parseInt(practiceDetail.frequency);
                week5Volume = parseInt(week5Volume) + parseInt(practiceDetail.volume);
                week5Density = parseInt(week5Density) + parseInt(practiceDetail.density);

                if(practiceDetail.type.indexOf('Transição ofensiva') >= 0) { week5TacticTO = parseInt(week5TacticTO) + 1;}
                if(practiceDetail.type.indexOf('Transição defensiva') >= 0) { week5TacticTD = parseInt(week5TacticTD) + 1;}
                if(practiceDetail.type.indexOf('Organização ofensiva') >= 0) { week5TacticOO = parseInt(week5TacticOO) + 1;}
                if(practiceDetail.type.indexOf('Organização defensiva') >= 0) { week5TacticOD = parseInt(week5TacticOD) + 1;}

                if(practiceDetail.intensity.indexOf('Baixa') == 0) { week5Intensity = parseInt(week5Intensity) + 20;}
                else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { week5Intensity = parseInt(week5Intensity) + 40;}
                else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { week5Intensity = parseInt(week5Intensity) + 60;}
                else if(practiceDetail.intensity.indexOf('Alta') == 0) { week5Intensity = parseInt(week5Intensity) + 80;}
                else if(practiceDetail.intensity.indexOf('Máxima') == 0) { week5Intensity = parseInt(week5Intensity) + 100;}
            }
          }
        }
      }

      //OO', 'OD', 'TD', 'TO'

      $scope.data = [
        [week1Intensity/100, week2Intensity/100, week3Intensity/100, week4Intensity/100, week5Intensity/100],
        [week1Volume/100, week2Volume/100, week3Volume/100, week4Volume/100, week5Volume/100],
        [week1Density/100, week2Density/100, week3Density/100, week4Density/100, week5Density/100],
        [week1Frequency/100, week2Frequency/100, week3Frequency/100, week4Frequency/100, week5Frequency/100]
      ];

      console.log($scope.data);

      $scope.dataOTD = [
        [(week1TacticOO*100)/25, (week2TacticOO*100)/25, (week3TacticOO*100)/25, (week4TacticOO*100)/25, (week5TacticOO*100)/25],
        [(week1TacticOD*100)/25, (week2TacticOD*100)/25, (week3TacticOD*100)/25, (week4TacticOD*100)/25, (week5TacticOD*100)/25],
        [(week1TacticTD*100)/25, (week2TacticTD*100)/25, (week3TacticTD*100)/25, (week4TacticTD*100)/25, (week5TacticTD*100)/25],
        [(week1TacticTO*100)/25, (week2TacticTO*100)/25, (week3TacticTO*100)/25, (week4TacticTO*100)/25, (week5TacticTO*100)/25]
      ];

      console.log($scope.dataOTD);
    }
});
