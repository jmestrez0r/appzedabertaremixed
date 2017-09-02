angular.module("Elifoot").controller('PracticesController',
  function($scope, $timeout, Practices, TeamPlayers, ngDialog) {

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
      { 'identification': 'icon1', 'component': 'glyphicon glyphicon-upload', 'drag': true, 'index': 0, 'image': false},
      { 'identification': 'icon2', 'component': 'glyphicon glyphicon-map-marker', 'drag': true, 'index': 1, 'image': false},
      { 'identification': 'icon3', 'component': 'glyphicon glyphicon-move', 'drag': true, 'index': 2, 'image': false},
      { 'identification': 'icon4', 'component': 'glyphicon glyphicon-arrow-left', 'drag': true, 'index': 3, 'image': false},
      { 'identification': 'icon5', 'component': 'glyphicon glyphicon-arrow-right', 'drag': true, 'index': 4, 'image': false},
      { 'identification': 'icon6', 'component': 'glyphicon glyphicon-arrow-up', 'drag': true, 'index': 5, 'image': false},
      { 'identification': 'icon7', 'component': 'glyphicon glyphicon-arrow-down', 'drag': true, 'index': 6, 'image': false},
      { 'identification': 'icon8', 'component': 'glyphicon glyphicon-exclamation-sign', 'drag': true, 'index': 7, 'image': false},
      { 'identification': 'icon9', 'fileName': 'arrow_down_left.png', 'image': true},
      { 'identification': 'icon10', 'fileName': 'arrow_down_right.png', 'image': true},
      { 'identification': 'icon11', 'fileName': 'arrow_middle_down_right.png', 'image': true},
      { 'identification': 'icon12', 'fileName': 'arrow_middle_down_left.png', 'image': true},
      { 'identification': 'icon13', 'fileName': 'arrow_middle_up_right.png', 'image': true},
      { 'identification': 'icon14', 'fileName': 'arrow_middle_up_left.png', 'image': true},
      { 'identification': 'icon15', 'fileName': 'arrow_up_left.png', 'image': true},
      { 'identification': 'icon16', 'fileName': 'arrow_up_right.png', 'image': true}
    ];

    $scope.selectedPractice = {
      title: '',
      exercise: '',
      datetime: '',
      type: [],
      volume: '',
      intensity: '',
      density: '',
      frequency: '',
      description: ''
    };

    $scope.selectedPractice.title = sessionStorage.getItem('selectedPractice');

    $scope.teamId = sessionStorage.getItem('teamId');

    $scope.loadPracticeDetails = function() {
      if($scope.selectedPractice.title != undefined &&
        $scope.selectedPractice.title != null &&
        $scope.selectedPractice.title != '') {
          //loadRecordedPracticeDetails
      }
    };

    //available players
    TeamPlayers.all($scope.teamId).success(function(data) {
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

    $scope.practiceDialog = function() {
      ngDialog.open({
        template: 'practiceDialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: false,
        height: 525,
        weight: 600
      });
    };

    $scope.selectPracticeType = function() {

      $scope.availabletypes = Practices.getAvailableTypes();
      console.log($scope.availabletypes);

      ngDialog.open({
        template: 'selectPracticeType.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: false,
        height: 300
      });
    };

    $scope.typeDescription = '';

    $scope.selectedIntensity = function(intensity) {
      $scope.selectedPractice.intensity = intensity;
    };

    $scope.addTypesToPractice = function() {
      $scope.typeDescription = '';
      for(var i = 0; i < $scope.availabletypes.length; i++) {
        if($scope.availabletypes[i].selected) {
          $scope.selectedPractice.type.push($scope.availabletypes[i].name);

          if($scope.typeDescription != '') {
              $scope.typeDescription += ', ';
            }
            $scope.typeDescription += $scope.availabletypes[i].name;
          }
      }
    };

    $scope.createOrSavePractice = function() {
      Practices.savePracticeDetail($scope.selectedPractice);
    }
});
