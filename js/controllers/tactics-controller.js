angular.module("Elifoot").controller('TacticsController',
  function($scope, Tactics, TeamPlayers, ngDialog, Fixtures, Tactics) {

    $scope.teamId = sessionStorage.getItem('teamId');
    $scope.selectedTactic = sessionStorage.getItem('selectedTactic');

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

    //TODO só mostrar os jogos a disputar!
    $scope.associateTacticToGameDialog = function() {
        Fixtures.all($scope.teamId).success(function(data) {
          console.log(data.fixtures);
          $scope.gamesList = data.fixtures;
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

    $scope.associateTacticToGamesDialog = function(gamesList) {
        for(var i = 0; i < gamesList.length; i++) {
          if(gamesList[i].selected != undefined &&
              gamesList[i].selected) {
              var tacticIdentification = Tactics.createTacticDetail(gamesList[i].matchday);
          }
        }
    };
});
