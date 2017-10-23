angular.module("Elifoot").controller('PracticesController',
  function($scope, $timeout, $cookies, $route, Practices, TeamPlayers, ngDialog) {

    $scope.selectedField = sessionStorage.getItem('selectedField');
    $scope.reloaded = sessionStorage.getItem('reloaded');

    $scope.selectedPractice = {
      title: '',
      exercise: '',
      datetime: '',
      type: '',
      volume: '',
      intensity: '',
      density: '',
      frequency: '',
      description: ''
    };

    $scope.selectedPractice.title = $cookies.getObject('selectedGameDescription');
    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.selectedGameId = $cookies.getObject('selectedGameId');

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

    $scope.availabletypes = [{
        selected: false,
        name: 'Transição ofensiva'
      }, {
        selected: false,
        name: 'Transição defensiva'
      }, {
        selected: false,
        name: 'Organização ofensiva'
      }, {
        selected: false,
        name: 'Organização defensiva'
      }, {
        selected: false,
        name: 'Esquemas tacticos'
      }];

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

    if($scope.selectedPractice.title != undefined &&
        $scope.selectedPractice.title != null &&
        $scope.selectedPractice.title != '') {
          //loadRecordedPracticeDetails
        Practices.getPractice($scope.selectedGameId, $scope.teamId).success(function (data) {
          console.log('getPractice');
          console.log(data);

          for(var i = 0; i < data.length; i++) {
            var object = data[i];

            $scope.droppedPlayers.push({
              'name': object.name,
              'colorPosition': '',
              'index': i,
              'number': object.jerseyNumber,
              'playerId': object.playerId,
              'topPosition': object.topPosition,
              'leftPosition': object.leftPosition
            });

            $scope.selectedPractice.title = object.title;
            $scope.selectedPractice.exercise = object.practiceDescription;
            $scope.selectedPractice.datetime = object.startDate;
            $scope.selectedPractice.type = object.type;
            $scope.selectedPractice.volume = object.volume;
            $scope.selectedPractice.intensity = object.intensity;
            $scope.selectedPractice.density = object.density;
            $scope.selectedPractice.frequency = object.frequency;
            $scope.selectedPractice.description = object.description;
            $scope.selectedField = object.selectedField;
            $scope.selectedFieldSize.weight = object.weight;
            $scope.selectedFieldSize.height = object.height;
          }
        });
    }

    $scope.loadPlayersIntoThePracticeTable = function() {
      for(var i = 0; i < $scope.droppedPlayers.length; i++) {
        if(document.getElementById($scope.droppedPlayers[i].number) != undefined &&
            document.getElementById($scope.droppedPlayers[i].number) != null) {
          document.getElementById($scope.droppedPlayers[i].number).setAttribute('style',
            'top:' + $scope.droppedPlayers[i].topPosition + 'px;' +
            'left:' + $scope.droppedPlayers[i].leftPosition + 'px');
        }
      }
    }

    //available players
    TeamPlayers.all($scope.teamId).success(function(data) {
        var playerSpecs = [];
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            var object = data[i];

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
      if($scope.droppedPlayers.length < 1) {
        alert('É necessário adicionar pelo menos um jogador.');
        return;
      }

      $scope.selectedGameId = $cookies.getObject('selectedGameId');

      if($scope.selectedGameId != null && $scope.selectedGameId != '' && $scope.selectedGameId != undefined) {
        Practices.deletePractice($scope.teamId, $scope.selectedGameId).success(function (data) {
          console.log(data);
          savePracticePlayers();
        });
      } else {
        savePracticePlayers();
      }
    };

    function savePlayers() {
      for(var i = 0; i < $scope.droppedPlayers.length; i++) {
        var player = $scope.droppedPlayers[i];
        console.log(player);

        console.log($scope.selectedTacticDescription + ' , ' +
          player.playerId + ' , ' + player.topPosition + ' , ' + player.leftPosition + ' , '
          + $scope.teamId + ' , ' + $scope.selectedGameId);

        Practices.savePlayerInPractice($scope.selectedPractice.title,
            $scope.selectedPractice.exercise, $scope.selectedPractice.datetime,
            $scope.selectedPractice.type, $scope.selectedPractice.volume,
            $scope.selectedPractice.intensity, $scope.selectedPractice.density,
            $scope.selectedPractice.frequency, $scope.selectedPractice.description,
            $scope.selectedField, player.playerId, player.topPosition,
            player.leftPosition, $scope.teamId, $scope.selectedGameId).success(function (data) {
          if(data != "New record!") {
            alert("Something occurred");
            console.log(data);
          }
        });
      }
    }

    $scope.toggleField = function() {
      Practices.deletePractice($scope.teamId, $scope.selectedGameId).success(function (data) {
        console.log(data);
      });

      if($scope.selectedField == undefined || $scope.selectedField == '') {
        $scope.selectedField = './images/football_pitch.jpeg';
        $scope.selectedFieldSize = {
          'weight': '620px',
          'height': '320px'
        };
      } else if($scope.selectedField.indexOf('football_pitch.jpeg') > 1) {
        $scope.selectedField = './images/football_pitch_half_right.jpeg';
        $scope.selectedFieldSize = {
          'weight': '500px',
          'height': '425px'
        };
      } else if($scope.selectedField.indexOf('football_pitch_half_right') > 1) {
        $scope.selectedField = './images/football_pitch_half_left.jpeg';
        $scope.selectedFieldSize = {
          'weight': '500px',
          'height': '425px'
        };
      } else if($scope.selectedField.indexOf('football_pitch_half_left')) {
        $scope.selectedField = './images/football_pitch.jpeg';
        $scope.selectedFieldSize = {
          'weight': '620px',
          'height': '320px'
        };
      }

      sessionStorage.setItem('selectedField', $scope.selectedField);

      if($scope.reloaded != undefined && $scope.reloaded != '') {
        if($scope.reloaded == 'false') {
          $scope.reloaded = 'true';
          sessionStorage.setItem('reloaded', 'true');
        } else {
          $route.reload();
          $scope.reloaded = 'false';
          sessionStorage.setItem('reloaded', 'false');
        }
      } else {
        $scope.reloaded = 'false';
        sessionStorage.setItem('reloaded', 'false');
      }
    };
});
