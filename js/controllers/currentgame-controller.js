var amodule = angular.module("Elifoot").controller('CurrentGameController',
   function($scope, ngDialog, $location, Tactics, TeamPlayers) {

     // INITIAL LOGIN module
    $scope.username = sessionStorage.getItem('user');
    $scope.password;
    $scope.userProfileType = sessionStorage.getItem('userProfile');
    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.droppedPlayers = [];
    $scope.players = [];

    if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
       $location.path('/home');
       return;
    }

    //load player
    //available players
    TeamPlayers.all($scope.teamId).success(function(data) {
        var playerSpecs = [];
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            var object = data[i];

            var playerName = object.name;
            var jerseyNumber = object.jerseyNumber;
            var playerId = object.playerId;
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
              'name': playerName,
              'colorPosition': colorPosition,
              'index': i,
              'number': jerseyNumber,
              'playerId': playerId
            })
        }

        $scope.players = playerSpecs;
    });

    //Load tactic board if exists
    $scope.selectedGameId = sessionStorage.getItem('selectedGameId');
    $scope.gameDescription = $scope.selectedGameId;

    if($scope.selectedGameId != null &&
      $scope.selectedGameId != undefined &&
        $scope.selectedGameId != '') {
          Tactics.getTactic($scope.selectedGameId, $scope.teamId).success(function (data) {
            console.log('getTactic');
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

              $scope.selectedTacticId = object.tacticId;
              $scope.selectedTacticDescription = object.description;
            }
          });
    };

     // LOADING TACTICAL BOARD ELEMENTS
    $scope.loadTacticalBoard = function () {
      document.getElementById('playersList').classList = [];
      document.getElementById('playersList').classList.add('toDisable');
      document.getElementById('playersList').classList.add('ng-pristine');
      document.getElementById('playersList').classList.add('ng-untouched');
      document.getElementById('playersList').classList.add('ng-valid');
      document.getElementById('playersList').classList.add('ui-droppable');
      document.getElementById('playersList').classList.add('ng-not-empty');

      //fixing disabledFeatures
      for(var i = 0; i < $scope.players.length; i++) {
        var player = $scope.players[i].number;
        document.getElementById(player).classList = [];
        document.getElementById(player).classList.add('col-md-4');
        document.getElementById(player).classList.add('div-circle-squre');
        document.getElementById(player).classList.add('toDisable');
        document.getElementById(player).classList.add('ng-pristine');
        document.getElementById(player).classList.add('ng-untouched');
        document.getElementById(player).classList.add('ng-valid');
        document.getElementById(player).classList.add('ng-scope');
        document.getElementById(player).classList.add('ui-draggable');
        document.getElementById(player).classList.add('ng-not-empty');
      }


      if($scope.droppedPlayers != undefined && $scope.droppedPlayers != null) {
        for(var i = 0; i < $scope.droppedPlayers.length; i++) {
          if(document.getElementById($scope.droppedPlayers[i].number) != undefined &&
              document.getElementById($scope.droppedPlayers[i].number) != null) {
            document.getElementById($scope.droppedPlayers[i].number).setAttribute('style',
              'top:' + $scope.droppedPlayers[i].topPosition + 'px;' +
              'left:' + $scope.droppedPlayers[i].leftPosition + 'px;');
          }
        }
      }
    }

    // TIMER
    $scope.timerRunning = false;

    $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };

    $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

    $scope.$on('timer-stopped', function (event, data){
        console.log('Timer Stopped - data = ', data);
    });
});
