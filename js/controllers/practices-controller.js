angular.module("Elifoot").controller('PracticesController',
  function($scope, $timeout, Practices, TeamPlayers) {

    //practice area
    $scope.practices = Practices.allPractices();
    console.log($scope.practices);

    $scope.visualizePractice = function(selected) {
      console.log('visualize practice' + selected);
      var practices = Practices.checkPractice(selected);
      console.log('visualize practice' + practices);
    }

    $scope.editPractice = function(selected) {
      console.log('edit practice' + selected);
      var practices = Practices.checkPractice(selected);
      console.log('edit practice' + practices);
    }

    $scope.duplicatePractice = function(selected) {
      console.log('duplicate practice' + selected);
      var practices = Practices.duplicatePractice(selected);
      console.log('duplicate practice' + practices);
    }

    $scope.removePractice = function(selected) {
      console.log('remove practice' + selected);
      var practices = Practices.removePractice(selected);
      console.log('remove practice' + practices);
    }

    //tablesize
    $scope.columns = [
      {'column': 1},
      {'column': 2},
      {'column': 3},
      {'column': 4}
    ];
    $scope.rows = [
      {'row': 1},
      {'row': 2},
      {'row': 3},
      {'row': 4},
      {'row': 5},
      {'row': 6}
    ];

    //component area
    $scope.icons = [
      { 'component': 'glyphicon glyphicon-upload', 'drag': true, 'index': 0, 'image': false},
      { 'component': 'glyphicon glyphicon-map-marker', 'drag': true, 'index': 1, 'image': false},
      { 'component': 'glyphicon glyphicon-move', 'drag': true, 'index': 2, 'image': false},
      { 'component': 'glyphicon glyphicon-arrow-left', 'drag': true, 'index': 3, 'image': false},
      { 'component': 'glyphicon glyphicon-arrow-right', 'drag': true, 'index': 4, 'image': false},
      { 'component': 'glyphicon glyphicon-arrow-up', 'drag': true, 'index': 5, 'image': false},
      { 'component': 'glyphicon glyphicon-arrow-down', 'drag': true, 'index': 6, 'image': false},
      { 'component': 'glyphicon glyphicon-exclamation-sign', 'drag': true, 'index': 7, 'image': false}
    ];

    $scope.arrows = [
      { 'fileName': 'arrow_down_left.png', 'image': true},
      { 'fileName': 'arrow_down_right.png', 'image': true},
      { 'fileName': 'arrow_middle_down_right.png', 'image': true},
      { 'fileName': 'arrow_middle_down_left.png', 'image': true},
      { 'fileName': 'arrow_middle_up_right.png', 'image': true},
      { 'fileName': 'arrow_middle_up_left.png', 'image': true},
      { 'fileName': 'arrow_up_left.png', 'image': true},
      { 'fileName': 'arrow_up_right.png', 'image': true}
    ];

    //available players
    TeamPlayers.all().success(function(data) {
        var playerSpecs = [];
        console.log(data);
        for(var i = 0; i < data.players.length; i++) {
            var object = data.players[i];

            var playerName = object.name;
            var jerseyNumber = object.jerseyNumber;
            var colorPosition = object.position.toLowerCase();
            if(colorPosition.includes('keeper')) {
                colorPosition = 'color:black';
            } else if (colorPosition.includes('centre') || colorPosition.includes('central')) {
                colorPosition = 'color:#f0ad4e';
            } else if (colorPosition.includes('defensive') || colorPosition.includes('back')) {
                colorPosition = 'color:#5cb85c';
            } else if (colorPosition.includes('striker') || colorPosition.includes('wing')) {
                colorPosition = 'color:red';
            }
            playerSpecs.push({
              'name': playerName, 'colorPosition': colorPosition, 'index': i, 'number': jerseyNumber
            })
        }

        $scope.players = playerSpecs;
    });

    //final list
    $scope.allList = [];

    $scope.dynamicIntensity = 0;
    $scope.dynamicVolume = 0;
    $scope.dynamicFrequency = 0;

    $scope.dynamicIntensityColor = '';
    $scope.dynamicIntensityLegend = '';
    $scope.dynamicVolumeColor = '';
    $scope.dynamicVolumeLegend = '';
    $scope.dynamicFrequencyColor = '';
    $scope.dynamicFrequencyLegend = '';

    $scope.progress = function(barClick){
      if(barClick == 'intensity') {
        $scope.dynamicIntensity = $scope.dynamicIntensity + 10;
        if($scope.dynamicIntensity > 100) {
          $scope.dynamicIntensity = 0;
          $scope.dynamicIntensityColor = '';
          $scope.dynamicIntensityLegend = '';
        }

        if($scope.dynamicIntensity >= 25 && $scope.dynamicIntensity < 50) {
          $scope.dynamicIntensityColor = 'color:blue;';
          $scope.dynamicIntensityLegend = 'Normal';
        } else if($scope.dynamicIntensity >= 50 && $scope.dynamicIntensity < 75) {
          $scope.dynamicIntensityColor = 'color:#f0ad4e;';
          $scope.dynamicIntensityLegend = 'Intenso';
        } else if($scope.dynamicIntensity >= 75 && $scope.dynamicIntensity <= 100) {
          $scope.dynamicIntensityColor = 'color:red;';
          $scope.dynamicIntensityLegend = 'Muito Intenso';
        }

      } else if(barClick == 'volume') {
        $scope.dynamicVolume = $scope.dynamicVolume + 10;
        if($scope.dynamicVolume > 180) {
          $scope.dynamicVolume = 0;
        }
      } else if(barClick == 'frequency') {
        $scope.dynamicFrequency = $scope.dynamicFrequency + 1;
        if($scope.dynamicFrequency > 10) {
          $scope.dynamicFrequency = 0;
        }
      }
    };

    $scope.makeItemVisible = function(itemId) {
        //make item visible
        document.getElementById(itemId);
    };
});
