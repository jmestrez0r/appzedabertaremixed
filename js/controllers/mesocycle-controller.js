angular.module("Elifoot").controller('MesocycleController',
  function($scope, Practices) {

    $scope.week = 0; //this variable goes to 0 from 4
    $scope.weekLoopInside = 0;
    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.series = ['Tática', 'Intensidade', 'Volume', 'Density', 'OO', 'OD', 'TD', 'TO']; //séries
    $scope.labels = []; //labels
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

      //Preenchimento das Datas após pedido à BD
      Practices.getPracticesOfATimelineToLoadTheGraphics($scope.startWeek, $scope.endWeek, $scope.teamId).success(function (data) {
        $scope.rawValues.push(data);
        console.log($scope.rawValues);
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
            fillVariables(week1TacticTO, week1TacticTD, week1TacticOO, week1TacticOD,
              week1Intensity, week1Volume, week1Density, week1Frequency, arrayWithData);
          } else if (i == 1) {
            fillVariables(week2TacticTO, week2TacticTD, week2TacticOO, week2TacticOD,
              week2Intensity, week2Volume, week2Density, week2Frequency, arrayWithData);
          } else if (i == 2) {
            fillVariables(week3TacticTO, week3TacticTD, week3TacticOO, week3TacticOD,
              week3Intensity, week3Volume, week3Density, week3Frequency, arrayWithData);
          } else if (i == 3) {
            fillVariables(week4TacticTO, week4TacticTD, week4TacticOO, week4TacticOD,
              week4Intensity, week4Volume, week4Density, week4Frequency, arrayWithData);
          } else if (i == 4) {
            fillVariables(week5TacticTO, week5TacticTD, week5TacticOO, week5TacticOD,
              week5Intensity, week5Volume, week5Density, week5Frequency, arrayWithData);
          }
        }
      }

      //OO', 'OD', 'TD', 'TO'

      $scope.data = [
        [week1Intensity/100, week2Intensity/100, week3Intensity/100, week4Intensity/100, week5Intensity/100],
        [week1Volume/100, week2Volume/100, week3Volume/100, week4Volume/100, week5Volume/100],
        [week1Density/100, week2Density/100, week3Density/100, week4Density/100, week5Density/100],
        [week1Frequency/100, week2Frequency/100, week3Frequency/100, week4Frequency/100, week5Frequency/100],
        [(week1TacticOO*100/25), (week2TacticOO*100/25), (week3TacticOO*100/25), (week4TacticOO*100/25), (week5TacticOO*100/25)],
        [(week1TacticOD*100/25), (week2TacticOD*100/25), (week3TacticOD*100/25), (week4TacticOD*100/25), (week5TacticOD*100/25)],
        [(week1TacticTD*100/25), (week2TacticTD*100/25), (week3TacticTD*100/25), (week4TacticTD*100/25), (week5TacticTD*100/25)],
        [(week1TacticTO*100/25), (week2TacticTO*100/25), (week3TacticTO*100/25), (week4TacticTO*100/25), (week5TacticTO*100/25)]
      ];
    }

    console.log(data);

    function fillVariables(weekTacticTO, weekTacticTD, weekTacticOO, weekTacticOD,
      weekIntensity, weekVolume, weekDensity, weekFrequency, arrayWithData) {
      for(var i = 0; i < arrayWithData.length; i++) {
        var practiceDetail = arrayWithData[i];

        weekFrequency = weekFrequency + practiceDetail.frequency;
        weekVolume = weekVolume + practiceDetail.volume;
        weekDensity = weekDensity + practiceDetail.density;

        if(practiceDetail.type.indexOf('Transição ofensiva') == 0) { weekTacticTO = weekTacticTO + 1;}
        if(practiceDetail.type.indexOf('Transição defensiva') == 0) { weekTacticTD = weekTacticTD + 1;}
        if(practiceDetail.type.indexOf('Organização ofensiva') == 0) { weekTacticOO = weekTacticOO + 1;}
        if(practiceDetail.type.indexOf('Organização defensiva') == 0) { weekTacticOD = weekTacticOD + 1;}

        if(practiceDetail.intensity.indexOf('Baixa') == 0) { weekIntensity = weekIntensity + 20;}
        else if(practiceDetail.intensity.indexOf('Média Baixa') == 0) { weekIntensity = weekIntensity + 40;}
        else if(practiceDetail.intensity.indexOf('Média Alta') == 0) { weekIntensity = weekIntensity + 60;}
        else if(practiceDetail.intensity.indexOf('Alta') == 0) { weekIntensity = weekIntensity + 80;}
        else if(practiceDetail.intensity.indexOf('Máxima') == 0) { weekIntensity = weekIntensity + 100;}
      }
    }
});
