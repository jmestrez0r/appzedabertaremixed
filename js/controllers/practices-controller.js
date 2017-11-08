angular.module("Elifoot").controller('PracticesController',
  function($scope, $timeout, $cookies, $route, Practices, TeamPlayers, ngDialog, CalendarInformation) {

    $scope.selectedField = sessionStorage.getItem('selectedField');
    $scope.reloaded = sessionStorage.getItem('reloaded');

    var showed = false;

    $scope.droppedPlayers = [];
    $scope.droppedIcons = [];
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

    $scope.selectedPractice.title = sessionStorage.getItem('selectedGameDescription');
    $scope.selectedPractice.datetime = sessionStorage.getItem('selectedGameDate');
    $scope.selectedGameId = sessionStorage.getItem('selectedGameId');

    $scope.teamId = sessionStorage.getItem('teamId');

    Practices.getAllPracticesInfo($scope.teamId).success(function (data) {
      console.log('get all practices info to load the combo-box.');
      console.log(data);
      $scope.allPractices = data;
      $scope.allPractices.push({
        density: '',
        description: '',
        eventId: '',
        frequency: '',
        intensity: '',
        practiceDesc: 'Repor definições',
        startDate: '',
        type: '',
        volume: ''
      });
    });

    $scope.refreshIcons = function() {
      for(var i = 0; i < $scope.players.length; i++) {
        if(document.getElementById($scope.players[i].number) != undefined &&
            document.getElementById($scope.players[i].number) != null) {
          document.getElementById($scope.players[i].number).removeAttribute('style');
          console.log('refreshing ' + $scope.players[i].name);
        }
      }
      for(var i = 0; i < $scope.icons.length; i++) {
        if(document.getElementById($scope.icons[i].identification) != undefined &&
            document.getElementById($scope.icons[i].identification) != null) {
          document.getElementById($scope.icons[i].identification).removeAttribute('style');
          console.log('refreshing ' + $scope.icons[i].identification);
        }
      }
    }

    $scope.loadPracticeValues = function(eventId) {
      if(eventId == '') {
        return;
      }
      Practices.getPractice(eventId, $scope.teamId).success(function (data) {
        console.log('getPractice');
        console.log(data);

        if(data != '') {
          for(var i = 0; i < data.length; i++) {
            var object = data[i];

            if(object.jerseyNumber != '' && object.jerseyNumber != null &&
              object.jerseyNumber != undefined) {
                $scope.droppedPlayers.push({
                  'name': object.name,
                  'colorPosition': '',
                  'index': i,
                  'number': object.jerseyNumber,
                  'playerId': object.playerId,
                  'topPosition': object.topPosition,
                  'leftPosition': object.leftPosition
                });
            } else {
              $scope.droppedIcons.push({
                'identification': object.iconId,
                'topPosition': object.iconTopPosition,
                'leftPosition': object.iconLeftPosition
              });
            }

            $scope.selectedPractice.title = object.title;
            $scope.selectedPractice.exercise = object.practiceDescription;
            $scope.selectedPractice.type = object.type;
            $scope.selectedPractice.volume = object.volume;
            $scope.selectedPractice.intensity = object.intensity;
            $scope.selectedPractice.density = object.density;
            $scope.selectedPractice.frequency = object.frequency;
            $scope.selectedPractice.description = object.description;
            $scope.selectedField = object.selectedField;
            $scope.selectedFieldSize.weight = object.weight;
            $scope.selectedFieldSize.height = object.height;

            if($scope.selectedField == '' || $scope.selectedField == undefined) {
              $scope.selectedField = './images/football_pitch.jpeg';
              $scope.selectedFieldSize = {
                'weight': '620px',
                'height': '320px'
              };
            }
            $scope.loadPlayersIntoThePracticeTable();
          }
        }
      });
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

          if(data != '') {
            for(var i = 0; i < data.length; i++) {
              var object = data[i];

              if(object.jerseyNumber != '' && object.jerseyNumber != null &&
                object.jerseyNumber != undefined) {
                  $scope.droppedPlayers.push({
                    'name': object.name,
                    'colorPosition': '',
                    'index': i,
                    'number': object.jerseyNumber,
                    'playerId': object.playerId,
                    'topPosition': object.topPosition,
                    'leftPosition': object.leftPosition
                  });
              } else {
                $scope.droppedIcons.push({
                  'identification': object.iconId,
                  'topPosition': object.iconTopPosition,
                  'leftPosition': object.iconLeftPosition
                });
              }


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

              if($scope.selectedField == '' || $scope.selectedField == undefined) {
                $scope.selectedField = './images/football_pitch.jpeg';
                $scope.selectedFieldSize = {
                  'weight': '620px',
                  'height': '320px'
                };
              }
            }
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
      for(var i = 0; i < $scope.droppedIcons.length; i++) {
        if(document.getElementById($scope.droppedIcons[i].identification) != undefined &&
            document.getElementById($scope.droppedIcons[i].identification) != null) {
          document.getElementById($scope.droppedIcons[i].identification).setAttribute('style',
            'top:' + $scope.droppedIcons[i].topPosition + 'px;' +
            'left:' + $scope.droppedIcons[i].leftPosition + 'px');
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
            var playerId = object.playerId;
            if(colorPosition.includes('keeper')) {
                colorPosition = 'color:black';
            } else if (colorPosition.includes('centre') || colorPosition.includes('central')) {
                colorPosition = 'color:#f0ad4e';
            } else if (colorPosition.includes('defensive') || colorPosition.includes('back')) {
                colorPosition = 'color:#5cb85c';
            } else if (colorPosition.includes('striker') || colorPosition.includes('wing')) {
                colorPosition = 'color:red';
            } else {
              colorPosition = '';
            }
            playerSpecs.push({
              'name': playerName,
              'colorPosition': colorPosition,
              'index': i,
              'number': jerseyNumber,
              'playerId': playerId
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

    $scope.selectedIntensity = function(intensity) {
      $scope.selectedPractice.intensity = intensity;
    };

    $scope.addTypesToPractice = function() {
      $scope.selectedPractice.type = '';
      for(var i = 0; i < $scope.availabletypes.length; i++) {
        if($scope.availabletypes[i].selected) {
          if($scope.selectedPractice.type != '') {
              $scope.selectedPractice.type += ', ';
            }
            $scope.selectedPractice.type += $scope.availabletypes[i].name;
          }
      }
    };

    $scope.createOrSavePractice = function() {
      if($scope.droppedPlayers.length < 1) {
        alert('É necessário adicionar pelo menos um jogador.');
        return;
      }

      $scope.selectedGameId = sessionStorage.getItem('selectedGameId');

      if($scope.selectedGameId != null && $scope.selectedGameId != '' && $scope.selectedGameId != undefined) {
        Practices.deletePractice($scope.teamId, $scope.selectedGameId).success(function (data) {
          console.log(data);
          savePracticePlayers($scope.teamId, $scope.selectedGameId);
        });
      } else {
        CalendarInformation.saveEvent($scope.selectedPractice.title, '#/practices', 'practice', $scope.selectedPractice.datetime, '', 'orange', $scope.teamId).success(function (data) {
            console.log(data);
            if(data == 'New record!') {
              CalendarInformation.getEventId($scope.selectedPractice.title, '#/practices', 'practice', $scope.selectedPractice.datetime, '', 'orange', $scope.teamId).success(function (data2) {
                console.log(data2);
                sessionStorage.setItem('selectedGameId', data2[0].eventId);
                $scope.selectedGameId = data2[0].eventId;

                savePracticePlayers($scope.teamId, $scope.selectedGameId);
              });
            } else {
              alert('Something occurred!');
            }
        });
      }
    };

    function savePracticePlayers(teamId, selectedGameId) {
      for(var i = 0; i < $scope.droppedPlayers.length; i++) {
        var player = $scope.droppedPlayers[i];
        console.log(player);

        console.log($scope.selectedPractice.title+ ', ' +
            $scope.selectedPractice.exercise+ ', ' + $scope.selectedPractice.datetime+ ', ' +
            $scope.selectedPractice.type+ ', ' + $scope.selectedPractice.volume+ ', ' +
            $scope.selectedPractice.intensity+ ', ' + $scope.selectedPractice.density+ ', ' +
            $scope.selectedPractice.frequency+ ', ' + $scope.selectedPractice.description+ ', ' +
            $scope.selectedField+ ', ' + player.playerId+ ', ' + player.topPosition+ ', ' +
            player.leftPosition+ ', ' + teamId+ ', ' + selectedGameId);

            var eventFeatures = {
              title: $scope.selectedPractice.title,
              teamId: teamId,
              selectedGameId: selectedGameId
            };

        Practices.savePlayerInPractice(eventFeatures,
            $scope.selectedPractice.exercise, $scope.selectedPractice.datetime,
            $scope.selectedPractice.type, $scope.selectedPractice.volume,
            $scope.selectedPractice.intensity, $scope.selectedPractice.density,
            $scope.selectedPractice.frequency, $scope.selectedPractice.description,
            $scope.selectedField, $scope.selectedFieldSize, player, '', '',
            '').success(function (data) {
          if(data != "New record!") {
            alert("Something occurred");
            console.log(data);
          }
        });
      }

      for(var i = 0; i < $scope.droppedIcons.length; i++) {
        var icon = $scope.droppedIcons[i];
        console.log(icon);

        console.log($scope.selectedPractice.title+ ', ' +
            $scope.selectedPractice.exercise+ ', ' + $scope.selectedPractice.datetime+ ', ' +
            $scope.selectedPractice.type+ ', ' + $scope.selectedPractice.volume+ ', ' +
            $scope.selectedPractice.intensity+ ', ' + $scope.selectedPractice.density+ ', ' +
            $scope.selectedPractice.frequency+ ', ' + $scope.selectedPractice.description+ ', ' +
            $scope.selectedField+ ', ' + player.playerId+ ', ' + player.topPosition+ ', ' +
            player.leftPosition+ ', ' + teamId+ ', ' + selectedGameId);

            var eventFeatures = {
              title: $scope.selectedPractice.title,
              teamId: teamId,
              selectedGameId: selectedGameId
            };

            var player = {
              playerId : '',
              topPosition : '',
              leftPosition : '',
            };

        Practices.savePlayerInPractice(eventFeatures,
            $scope.selectedPractice.exercise, $scope.selectedPractice.datetime,
            $scope.selectedPractice.type, $scope.selectedPractice.volume,
            $scope.selectedPractice.intensity, $scope.selectedPractice.density,
            $scope.selectedPractice.frequency, $scope.selectedPractice.description,
            $scope.selectedField, $scope.selectedFieldSize, player, icon.identification, icon.topPosition,
            icon.leftPosition).success(function (data) {
          if(data != "New record!") {
            alert("Something occurred");
            console.log(data);
          } else {
            if(!showed) {
              showed = true;
              ngDialog.open({
                  template: 'successMessage.html',
                  className: 'ngdialog-theme-default',
                  showClose: false
              });
            }
          }
        });
      }
    }

    $scope.dropPracticeCallback = function(event, ui) {
      console.log("selected object with number: " + ui.helper.context.id);
      console.log("selected player positions:");
      console.log("TOP: " + ui.position.top);
      console.log("TOP: " + ui.position.left);

      updatePlayerPracticeLocationAndAddToList(ui.helper.context.id, ui.position.top, ui.position.left);
      updateObjectPracticeLocationAndAddToList(ui.helper.context.id, ui.position.top, ui.position.left);

      console.log($scope.players);
    };

    function updatePlayerPracticeLocationAndAddToList(number, topPosition, leftPosition) {
      for(var i = 0; i < $scope.players.length; i++) {
        if($scope.players[i].number == number) {
          for(var j = 0; j < $scope.droppedPlayers.length; j++) {
            if($scope.droppedPlayers[j].number == number) {
              $scope.droppedPlayers.splice(j,1);
            }
          }
          $scope.players[i].topPosition = topPosition;
          $scope.players[i].leftPosition = leftPosition;
          $scope.droppedPlayers.push($scope.players[i]);
          return;
        }
      }
    }

    function updateObjectPracticeLocationAndAddToList(id, topPosition, leftPosition) {
      for(var i = 0; i < $scope.icons.length; i++) {
        if($scope.icons[i].identification == id) {
          for(var j = 0; j < $scope.droppedIcons.length; j++) {
            if($scope.droppedIcons[j].identification == id) {
              $scope.droppedIcons.splice(j,1);
            }
          }
          $scope.icons[i].topPosition = topPosition;
          $scope.icons[i].leftPosition = leftPosition;
          $scope.droppedIcons.push($scope.icons[i]);
          return;
        }
      }
    }

    $scope.toggleField = function() {

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
      } else if($scope.selectedField.indexOf('football_pitch_half_left') > 1) {
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
