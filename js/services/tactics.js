angular.module('Elifoot').factory('Tactics', ['$http', function($http) {
  return {
      all: function() {
          return
      },
      createTacticDetail: function(gameId) {
          console.log('creating tactic and associate to game Id ' + gameId);
      },
      getTactic: function(eventId, teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/tactics/getTactic.php', {
          'teamId' : teamId,
          'eventId' : eventId
        });
      },
      savePlayerInTactic: function(selectedTacticDescription, playerId, topPosition,
          leftPosition, teamId, eventId) {
        return $http.post('./js/services/phpservices/tactics/saveTacticByPlayer.php', {
          'teamId' : teamId,
          'eventId' : eventId,
          'playerId' : playerId,
          'topPosition' : topPosition,
          'leftPosition' : leftPosition,
          'description' : selectedTacticDescription
        });
      },
      deleteTactic: function(teamId, eventId) {
        return $http.post('./js/services/phpservices/tactics/deleteTactic.php', {
          'teamId' : teamId,
          'eventId' : eventId
        });
      }
  }
}]);
