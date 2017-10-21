angular.module("Elifoot").controller('TacticsController',
  function($scope, $cookies, Tactics, TeamPlayers, ngDialog, Fixtures, Tactics) {

    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.selectedGameId = $cookies.getObject('selectedGameId');
    $scope.selectedTacticDescription = $cookies.getObject('selectedGameDescription');

    //Load tactic board if exists
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

    $scope.loadPlayersIntoTheTable = function() {
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

    //subplayers
    $scope.subplayers = TeamPlayers.subPlayers($scope.teamId);
    $scope.gamesList = [];
    $scope.droppedPlayers = [];

    $scope.dropCallback = function(event, ui) {
      console.log("selected object with number: " + ui.helper.context.id);
      console.log("selected player positions:");
      console.log("TOP: " + ui.position.top);
      console.log("TOP: " + ui.position.left);

      updatePlayerObjectLocationAndAddToList(ui.helper.context.id, ui.position.top, ui.position.left);;

      console.log($scope.players);
    };


    function updatePlayerObjectLocationAndAddToList(number, topPosition, leftPosition) {
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

    //Save the tactic information and associateItToGame
    $scope.createTacticToGame = function() {
      if($scope.droppedPlayers.length < 1) {
        alert('É necessário adicionar pelo menos um jogador.');
        return;
      }

      if($scope.selectedGameId != null && $scope.selectedGameId != '' && $scope.selectedGameId != undefined) {
        Tactics.deleteTactic($scope.teamId, $scope.selectedGameId).success(function (data) {
          console.log(data);
          savePlayers();
        });
      } else {
        savePlayers();
      }
    };

    function savePlayers() {
      for(var i = 0; i < $scope.droppedPlayers.length; i++) {
        var player = $scope.droppedPlayers[i];
        console.log(player);

        console.log($scope.selectedTacticDescription + ' , ' +
          player.playerId + ' , ' + player.topPosition + ' , ' + player.leftPosition + ' , '
          + $scope.teamId + ' , ' + $scope.selectedGameId);

        Tactics.savePlayerInTactic($scope.selectedTacticDescription, player.playerId, player.topPosition,
            player.leftPosition, $scope.teamId, $scope.selectedGameId).success(function (data) {
          if(data != "New record!") {
            alert("Something occurred");
            console.log(data);
          }
        });
      }
    }

    //mostrar os jogos a disputar!
    $scope.associateTacticToGameDialog = function() {
        Fixtures.all($scope.teamId).success(function(data) {
          console.log(data.fixtures);
          var currentDate = new Date();
          for(var i = 0; i < data.fixtures.length; i++) {
            var description = data.fixture[i].homeTeamName + ' vs ' + data.fixture[i].awayTeamName;
            if(description != $scope.selectedTacticDescription) {
              if(new Date(data.fixtures[i].date) > currentDate) {
                $scope.gamesList.push(data.fixtures[i]);
              }
            }
          }
        });

        console.log('gameslist');
        console.log($scope.gamesList);

        ngDialog.open({
          template: 'associateTacticDialog.html',
          className: 'ngdialog-theme-default',
          scope: $scope,
          showClose: false,
          height: 350,
          weight: 700
        });
    };

    //TODO
    //Compile All the Information of the previous game and put it into the new game association
    $scope.associateTacticToGamesDialog = function(gamesList) {

        for(var i = 0; i < gamesList.length; i++) {
          if(gamesList[i].selected != undefined &&
              gamesList[i].selected) {

              if($scope.selectedGameId != null &&
                $scope.selectedGameId != '' &&
                $scope.selectedGameId != undefined) {

              }
              var tacticIdentification = Tactics.createTacticDetail(gamesList[i].matchday);
          }
        }
    };
});
