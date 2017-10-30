angular.module("Elifoot").controller('TacticsController',
  function($scope, $cookies, Tactics, TeamPlayers, ngDialog, Fixtures, Tactics, CalendarInformation) {

    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.selectedGameId = sessionStorage.getItem('selectedGameId');
    $scope.selectedTacticDescription = sessionStorage.getItem('selectedGameDescription');

    var showed = false;

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

      $scope.selectedGameId = sessionStorage.getItem('selectedGameId');

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

    function associatedTacticSavePlayers(gameOfTheList) {
      for(var i = 0; i < $scope.droppedPlayers.length; i++) {
        var player = $scope.droppedPlayers[i];
        console.log(player);

        console.log(gameOfTheList.title + ' , ' +
          player.playerId + ' , ' + player.topPosition + ' , ' + player.leftPosition + ' , '
          + $scope.teamId + ' , ' + gameOfTheList.id);

        Tactics.savePlayerInTactic(gameOfTheList.title, player.playerId, player.topPosition,
            player.leftPosition, $scope.teamId, gameOfTheList.id).success(function (data) {
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

    function urlVerification(type) {
      if(type == 'game') {
        return '#/tactics';
      } else if (type == 'meeting') {
        return '';
      } else if (type == 'practice') {
        return '#/practices';
      }
    }

    function colorVerification(type) {
      if(type == 'game') {
        return 'red';
      } else if (type == 'meeting') {
        return '';
      } else if (type == 'practice') {
        return 'orange';
      }
    }

    function eventExit(game) {
      for(var i = 0; i < $scope.gamesList.length; i++) {
        var storedGame = $scope.gamesList[i];
        if(storedGame.title == game.homeTeamName + ' vs ' + game.awayTeamName &&
          storedGame.start == game.date.replace('T', ' ').replace('Z', '')) {
            return true;
        }
      }
      return false;
    }


    //mostrar os jogos a disputar!
    $scope.associateTacticToGameDialog = function() {
      //get the information of the events
      CalendarInformation.getEvents($scope.teamId).success(function (data) {
        var currentDate = new Date();
        for(var i = 0; i < data.length; i++) {
          var colorVar = colorVerification(data[i].type);
          var urlVar = urlVerification(data[i].type);

          if(data[i].type == 'game' && new Date(data[i].startDate) > currentDate) {
            $scope.gamesList.push({
              id: data[i].eventId,
              title: data[i].title,
              url:   urlVar,
              type: data[i].type,
              start: data[i].startDate,
              end: data[i].endDate,
              color: colorVar
            });
          }
        }

        Fixtures.all($scope.teamId).success(function(data) {
            var currentDate = new Date();
            for(var i = 0; i < data.fixtures.length; i++) {
              var game = data.fixtures[i];

              //verify if the event exists
              if(!eventExit(game) && new Date(game.date) > currentDate) {
                $scope.gamesList.push({
                  id: '',
                  title: game.homeTeamName + ' vs ' + game.awayTeamName,
                  url:   '#/tactics',
                  type: 'game',
                  start: game.date.replace('T', ' ').replace('Z', ''),
                  end: '',
                  color: 'red'
                });
              }
            }
        });
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

    //BUG TODO
    //Compile All the Information of the previous game and put it into the new game association
    $scope.associateTacticToGamesDialog = function() {
        if(true) {
          ngDialog.open({
            template: 'errorMessage.html',
            className: 'ngdialog-theme-default'
          });
          return;
        }

        for(var i = 0; i < $scope.gamesList.length; i++) {
          var gameOfTheList = $scope.gamesList[i];
          if(gameOfTheList.selected != undefined &&
              gameOfTheList.selected) {
                //event exists in the database
              if(gameOfTheList.id != '' && gameOfTheList.id != undefined &&
                gameOfTheList.id != null) {
                  Tactics.deleteTactic($scope.teamId, gameOfTheList.id).success(function (data) {
                    console.log(data);
                    associatedTacticSavePlayers(gameOfTheList);
                  });

                } else {
                  //event doesn't exists in the database
                  //it's necessary to create it
                  //save the event into database
                  CalendarInformation.saveEvent(gameOfTheList.title, '#/tactics', 'game', gameOfTheList.start, '', 'red', $scope.teamId).success(function (data) {
                    console.log(data);
                    if(data == "New record!") {
                      CalendarInformation.getEventId(gameOfTheList.title, '#/tactics', 'game', gameOfTheList.start, '', 'red', $scope.teamId).success(function (data2) {
                        gameOfTheList.id = data2[0].eventId;
                        associatedTacticSavePlayers(gameOfTheList);
                      });
                    }
                  });
                }
              }
        }
    };
});
