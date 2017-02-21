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
      { 'component': 'glyphicon glyphicon-upload', 'drag': true, 'index': 0},
      { 'component': 'glyphicon glyphicon-map-marker', 'drag': true, 'index': 1},
      { 'component': 'glyphicon glyphicon-move', 'drag': true, 'index': 2},
      { 'component': 'glyphicon glyphicon-arrow-left', 'drag': true, 'index': 3},
      { 'component': 'glyphicon glyphicon-arrow-right', 'drag': true, 'index': 4},
      { 'component': 'glyphicon glyphicon-arrow-up', 'drag': true, 'index': 5},
      { 'component': 'glyphicon glyphicon-arrow-down', 'drag': true, 'index': 6},
      { 'component': 'glyphicon glyphicon-exclamation-sign', 'drag': true, 'index': 7}
    ];

    $scope.arrows = [
      { 'fileName': 'arrow_down_left.png'},
      { 'fileName': 'arrow_down_right.png'},
      { 'fileName': 'arrow_middle_down_right.png'},
      { 'fileName': 'arrow_middle_down_left.png'},
      { 'fileName': 'arrow_middle_up_right.png'},
      { 'fileName': 'arrow_middle_up_left.png'},
      { 'fileName': 'arrow_up_left.png'},
      { 'fileName': 'arrow_up_right.png'}
    ];

    //available players
    TeamPlayers.all().success(function(data) {
        var playerSpecs = [];

        for(var i = 0; i < data.players.length; i++) {
            var object = data.players[i];

            var playerName = object.name;
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
              'name': playerName, 'colorPosition': colorPosition, 'index': i
            })
        }

        $scope.players = playerSpecs;
    });

    //final list
    $scope.allList = [];
});
