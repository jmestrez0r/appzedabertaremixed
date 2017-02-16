angular.module("Elifoot").controller('TacticalController',
  function($scope, Tactical, TeamPlayers) {

  Tactical.all(function(data) {
      $scope.tactics = data;
      console.log(data);
  });

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
            'name': playerName, 'colorPosition': colorPosition
          })
      }
      $scope.players = playerSpecs;
  });

});
